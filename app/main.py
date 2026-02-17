from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import tempfile
from app.utils import query_rag

# Load environment variables
load_dotenv()

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
    error: str = None

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
        
        # Process the PDF
        answer, sources = query_rag(temp_path, query_type)
        
        # Clean up temp file
        os.remove(temp_path)
        
        return AnalysisResponse(
            response=answer,
            sources=sources,
            success=True
        )
    
    except Exception as e:
        # Clean up temp file if it exists
        if 'temp_path' in locals() and os.path.exists(temp_path):
            os.remove(temp_path)
        
        return AnalysisResponse(
            response="",
            sources="",
            success=False,
            error=str(e)
        )

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Research Paper Analyzer"}

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