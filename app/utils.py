import os
import tempfile
import requests
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader, Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure LLM provider based on environment variable
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "groq").lower()  # Options: "ollama" or "groq"

if LLM_PROVIDER == "groq":
    # Groq - MUCH FASTER than Ollama (recommended)
    from langchain_groq import ChatGroq
    from langchain_huggingface import HuggingFaceEmbeddings
    
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",  # Fast and powerful
        temperature=0.3,
        api_key=os.getenv("GROQ_API_KEY")
    )
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    print("✓ Using Groq (Fast Cloud LLM)")
else:
    # Ollama - Local but slower
    from langchain_community.embeddings import OllamaEmbeddings
    from langchain_community.llms import Ollama
    
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    llm = Ollama(model="llama3.2", temperature=0.3)
    print("✓ Using Ollama (Local LLM)")

# Prompt templates
key_insights_prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""Extract the key insights from the given document. 
    
Document content: 
{context}

For your response:
1. Start with a brief 2-3 sentence summary of what the document is about
2. List 5-8 key insights with clear headings and brief explanations
3. For each insight, include a short explanation of its significance
4. End with a one-paragraph conclusion connecting these insights

Format each insight as:
## [Insight Title]
[1-2 sentences explaining the insight]
[1 sentence about why this matters]

Query: {question}
""")

research_gaps_prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""Identify research gaps or limitations in the given document.

Document content:
{context}

For your response:
1. Begin with a brief overview of the document's focus (2-3 sentences)
2. Identify 4-6 significant research gaps or limitations
3. For each gap:
   - Provide a clear, descriptive title
   - Explain why this represents a gap in the research
   - Suggest a specific direction for future research to address this gap
4. Conclude with a brief paragraph on the overall implications of these gaps

Format each gap as:
## [Gap Title]
[2 sentences explaining the gap]
[1 sentence suggesting future research direction]

Query: {question}
"""
)

def process_document(file_path):
    """Process PDF or DOCX and create vector database"""
    # Select appropriate loader based on file extension
    if file_path.lower().endswith('.pdf'):
        loader = PyPDFLoader(file_path)
    elif file_path.lower().endswith('.docx'):
        loader = Docx2txtLoader(file_path)
    else:
        raise ValueError(f"Unsupported file type. Please use PDF or DOCX files.")
    
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)
    return FAISS.from_documents(chunks, embeddings)

def process_text(text):
    """Process raw text and create vector database"""
    if not text or not text.strip():
        raise ValueError("No text provided.")
    documents = [Document(page_content=text, metadata={"source": "pasted_text"})]
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)
    return FAISS.from_documents(chunks, embeddings)

def process_url(url):
    """Download a paper from URL and process it. Supports direct PDF links, arXiv, and DOI."""
    url = url.strip()
    
    # Handle DOI — resolve to URL
    if url.startswith("10.") or url.startswith("doi:"):
        doi = url.replace("doi:", "").strip()
        url = f"https://doi.org/{doi}"
    
    # Handle arXiv abstract URL → convert to PDF URL
    if "arxiv.org/abs/" in url:
        url = url.replace("/abs/", "/pdf/") + ".pdf"
    
    # Try downloading as PDF
    headers = {"User-Agent": "Mozilla/5.0 (ResearchAI Paper Analyzer)"}
    response = requests.get(url, headers=headers, timeout=30, allow_redirects=True)
    response.raise_for_status()
    
    content_type = response.headers.get("Content-Type", "")
    
    if "pdf" in content_type or url.endswith(".pdf"):
        # It's a PDF — save and process
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            tmp.write(response.content)
            tmp_path = tmp.name
        return tmp_path, process_document(tmp_path)
    else:
        # Treat as HTML — extract text content
        from html.parser import HTMLParser
        
        class TextExtractor(HTMLParser):
            def __init__(self):
                super().__init__()
                self.texts = []
                self._skip = False
            def handle_starttag(self, tag, attrs):
                self._skip = tag in ("script", "style", "nav", "header", "footer")
            def handle_endtag(self, tag):
                if tag in ("script", "style", "nav", "header", "footer"):
                    self._skip = False
            def handle_data(self, data):
                if not self._skip:
                    stripped = data.strip()
                    if stripped:
                        self.texts.append(stripped)
        
        parser = TextExtractor()
        parser.feed(response.text)
        extracted = "\n".join(parser.texts)
        
        if len(extracted) < 200:
            raise ValueError("Could not extract enough text from the URL. Try providing a direct PDF link or pasting the text instead.")
        
        # Save extracted text as a temp file for session tracking
        with tempfile.NamedTemporaryFile(delete=False, suffix=".txt", mode="w", encoding="utf-8") as tmp:
            tmp.write(extracted)
            tmp_path = tmp.name
        
        return tmp_path, process_text(extracted)

def query_rag_from_vectorstore(vector_db, query_type):
    """Perform RAG query using an existing vector store"""
    retriever = vector_db.as_retriever(search_kwargs={"k": 4})
    prompt = key_insights_prompt if query_type == "Key Insights" else research_gaps_prompt
    
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)
    
    from langchain_core.runnables import RunnableParallel
    
    rag_chain = (
        RunnableParallel({"context": retriever | format_docs, "question": RunnablePassthrough()})
        | prompt
        | llm
    )
    response = rag_chain.invoke(query_type)
    sources = "Analysis based on document contents"
    return response.content if hasattr(response, 'content') else str(response), sources

def process_pdf(pdf_path):
    """Process PDF and create vector database (legacy function)"""
    return process_document(pdf_path)

# ── In-memory store for chat vector DBs ──
_chat_vector_stores = {}

def get_or_create_vector_store(file_path, session_id=None):
    """Get existing vector store or create a new one for the document"""
    key = session_id or file_path
    if key not in _chat_vector_stores:
        _chat_vector_stores[key] = process_document(file_path)
    return _chat_vector_stores[key]

def clear_vector_store(session_id):
    """Clear a cached vector store"""
    if session_id in _chat_vector_stores:
        del _chat_vector_stores[session_id]

# Chat prompt template
chat_prompt = PromptTemplate(
    input_variables=["context", "question", "chat_history"],
    template="""You are a helpful research assistant. Answer the user's question based strictly on the provided research paper content. If the answer cannot be found in the document, say so clearly.

Document content:
{context}

Previous conversation:
{chat_history}

User question: {question}

Provide a clear, concise answer based on the document. Use specific details, quotes, or data from the paper when possible. Format your response with markdown for readability.
"""
)

def query_chat(file_path, question, chat_history=None, session_id=None):
    """Answer a question about the document using RAG"""
    vector_db = get_or_create_vector_store(file_path, session_id)
    retriever = vector_db.as_retriever(search_kwargs={"k": 5})

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    # Format chat history
    history_str = ""
    if chat_history:
        for msg in chat_history[-6:]:  # Keep last 6 messages for context
            role = "User" if msg["role"] == "user" else "Assistant"
            history_str += f"{role}: {msg['content']}\n"

    # Retrieve relevant chunks
    relevant_docs = retriever.invoke(question)
    context = format_docs(relevant_docs)

    # Build the prompt and invoke LLM
    formatted_prompt = chat_prompt.format(
        context=context,
        question=question,
        chat_history=history_str
    )

    response = llm.invoke(formatted_prompt)
    answer = response.content if hasattr(response, 'content') else str(response)
    return answer

def query_rag(file_path, query_type):
    """Perform RAG query on the document (PDF or DOCX)"""
    vector_db = process_document(file_path)
    retriever = vector_db.as_retriever(search_kwargs={"k": 4})
    prompt = key_insights_prompt if query_type == "Key Insights" else research_gaps_prompt
    
    # Create a simple RAG chain
    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)
    
    from langchain_core.runnables import RunnableParallel
    
    rag_chain = (
        RunnableParallel({"context": retriever | format_docs, "question": RunnablePassthrough()})
        | prompt
        | llm
    )
    response = rag_chain.invoke(query_type)
    sources = "Analysis based on document contents"
    return response.content if hasattr(response, 'content') else str(response), sources

def ui_interface(pdf_file, query_type):
    """Handle UI interface for both Gradio and FastAPI"""
    if hasattr(pdf_file, 'name') and os.path.exists(pdf_file.name):
        # Regular file from FastAPI
        pdf_path = pdf_file.name
    else:
        # For Gradio in Jupyter, we need special handling
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            # Handle various file object types
            if isinstance(pdf_file, str) and os.path.exists(pdf_file):
                # If it's a path string
                with open(pdf_file, 'rb') as f:
                    temp_file.write(f.read())
            elif hasattr(pdf_file, 'read'):
                # If it's a file-like object
                content = pdf_file.read()
                if isinstance(content, str):
                    temp_file.write(content.encode('utf-8'))
                else:
                    temp_file.write(content)
            else:
                # Try direct conversion to bytes
                temp_file.write(pdf_file if isinstance(pdf_file, bytes) else str(pdf_file).encode('utf-8'))
            pdf_path = temp_file.name
    
    try:
        answer, sources = query_rag(pdf_path, query_type)
        return answer, sources
    finally:
        # Clean up temp file if we created one
        if pdf_path != getattr(pdf_file, 'name', '') and os.path.exists(pdf_path):
            os.remove(pdf_path)