from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import os
import tempfile
import uuid
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from app.utils import query_rag, query_chat, get_or_create_vector_store, clear_vector_store, process_text, process_url, query_rag_from_vectorstore

# Load environment variables
load_dotenv()

# Google OAuth Client ID — replace with your own from Google Cloud Console
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com")

# Create FastAPI app
app = FastAPI(title="Research Paper Analyzer API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class AnalysisRequest(BaseModel):
    query_type: str  # "Key Insights" or "Research Gaps"

class AnalysisResponse(BaseModel):
    response: str
    sources: str
    success: bool
    session_id: str = None
    error: str = None

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str
    session_id: str
    chat_history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    answer: str
    success: bool
    error: str = None

class TextAnalysisRequest(BaseModel):
    text: str
    query_type: str = "Research Gaps"

class UrlAnalysisRequest(BaseModel):
    url: str
    query_type: str = "Research Gaps"

# In-memory store for session file paths
_session_files = {}

@app.get("/")
async def root():
    return {"message": "Research Paper Analyzer API", "status": "running"}

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_paper(
    file: UploadFile = File(...),
    query_type: str = Form("Key Insights")
):
    """
    Analyze a research paper (PDF or DOCX) and extract insights or research gaps
    """
    if not (file.filename.endswith('.pdf') or file.filename.endswith('.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported")
    
    try:
        # Save uploaded file temporarily
        file_suffix = ".pdf" if file.filename.endswith('.pdf') else ".docx"
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_suffix) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        
        # Create a session ID for this analysis
        session_id = str(uuid.uuid4())
        
        # Process the PDF
        answer, sources = query_rag(temp_path, query_type)
        
        # Pre-build the vector store for chat and keep the file for the session
        get_or_create_vector_store(temp_path, session_id)
        _session_files[session_id] = temp_path
        
        return {
            "response": answer,
            "sources": sources,
            "success": True,
            "session_id": session_id,
        }
    
    except Exception as e:
        # Clean up temp file if it exists
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.remove(temp_path)
        
        return JSONResponse(content={
            "response": "",
            "sources": "",
            "success": False,
            "error": str(e)
        })

@app.post("/api/analyze-text")
async def analyze_text(request: TextAnalysisRequest):
    """Analyze pasted research paper text"""
    if not request.text or not request.text.strip():
        return JSONResponse(content={
            "response": "", "sources": "", "success": False,
            "error": "No text provided."
        })
    
    try:
        session_id = str(uuid.uuid4())
        vector_db = process_text(request.text)
        
        # Save the text to a temp file for chat session
        with tempfile.NamedTemporaryFile(delete=False, suffix=".txt", mode="w", encoding="utf-8") as tmp:
            tmp.write(request.text)
            tmp_path = tmp.name
        
        _session_files[session_id] = tmp_path
        _chat_vector_stores_direct[session_id] = vector_db
        
        answer, sources = query_rag_from_vectorstore(vector_db, request.query_type)
        
        return {
            "response": answer,
            "sources": sources,
            "success": True,
            "session_id": session_id,
        }
    except Exception as e:
        return JSONResponse(content={
            "response": "", "sources": "", "success": False,
            "error": str(e)
        })

@app.post("/api/analyze-url")
async def analyze_url(request: UrlAnalysisRequest):
    """Analyze a research paper from a URL or DOI"""
    if not request.url or not request.url.strip():
        return JSONResponse(content={
            "response": "", "sources": "", "success": False,
            "error": "No URL provided."
        })
    
    try:
        session_id = str(uuid.uuid4())
        tmp_path, vector_db = process_url(request.url)
        
        _session_files[session_id] = tmp_path
        _chat_vector_stores_direct[session_id] = vector_db
        
        answer, sources = query_rag_from_vectorstore(vector_db, request.query_type)
        
        return {
            "response": answer,
            "sources": sources,
            "success": True,
            "session_id": session_id,
        }
    except Exception as e:
        return JSONResponse(content={
            "response": "", "sources": "", "success": False,
            "error": str(e)
        })

# Direct vector store cache (for text/url that bypass file-based process_document)
_chat_vector_stores_direct = {}

@app.post("/api/chat")
async def chat_with_paper(request: ChatRequest):
    """
    Chat with the analyzed research paper using RAG
    """
    session_id = request.session_id
    
    if session_id not in _session_files:
        return ChatResponse(
            answer="",
            success=False,
            error="Session not found. Please analyze a paper first."
        )
    
    file_path = _session_files[session_id]
    
    if not os.path.exists(file_path):
        return ChatResponse(
            answer="",
            success=False,
            error="Document file not found. Please re-upload and analyze."
        )
    
    try:
        chat_history = [{"role": m.role, "content": m.content} for m in (request.chat_history or [])]
        
        # If we have a pre-built vector store (from text/url), register it for chat
        if session_id in _chat_vector_stores_direct:
            from app.utils import _chat_vector_stores
            _chat_vector_stores[session_id] = _chat_vector_stores_direct[session_id]
        
        answer = query_chat(file_path, request.question, chat_history, session_id)
        return ChatResponse(answer=answer, success=True)
    except Exception as e:
        return ChatResponse(
            answer="",
            success=False,
            error=str(e)
        )

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Research Paper Analyzer"}

# ── Google OAuth Authentication ──────────────────────────────────────────
class GoogleAuthRequest(BaseModel):
    credential: str  # The Google ID token (JWT) from frontend

class GoogleAuthResponse(BaseModel):
    success: bool
    user: Optional[dict] = None
    error: Optional[str] = None

@app.post("/api/auth/google", response_model=GoogleAuthResponse)
async def google_auth(request: GoogleAuthRequest):
    """Verify Google OAuth token and return user info"""
    try:
        # Verify the Google ID token
        idinfo = id_token.verify_oauth2_token(
            request.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

        # Token is valid — extract user information
        user_data = {
            "id": idinfo.get("sub"),
            "email": idinfo.get("email"),
            "name": idinfo.get("name"),
            "picture": idinfo.get("picture"),
            "given_name": idinfo.get("given_name"),
            "family_name": idinfo.get("family_name"),
            "email_verified": idinfo.get("email_verified", False),
        }

        return GoogleAuthResponse(success=True, user=user_data)

    except ValueError as e:
        # Invalid token
        return GoogleAuthResponse(success=False, error=f"Invalid token: {str(e)}")
    except Exception as e:
        return GoogleAuthResponse(success=False, error=f"Authentication failed: {str(e)}")

# Mount static files for React build (production)
# Uncomment when you build React app
# app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")

# Define a function to run the server that can be imported by other modules
def run_server(host="127.0.0.1", port=8000):
    import uvicorn
    uvicorn.run(app, host=host, port=port)

# This allows the file to be run directly for development
if __name__ == "__main__":
    run_server()