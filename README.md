# AI Research Paper Analyzer - RAG with React & FastAPI

A modern web application that uses Retrieval-Augmented Generation (RAG) with Ollama to analyze research papers and extract key insights or identify research gaps.

## ✨ Features

- **🎨 Modern React UI**: Beautiful, responsive interface with smooth animations
- **📄 PDF Analysis**: Upload any research paper in PDF format
- **💡 Key Insights Extraction**: Automatically identify and summarize main findings
- **🔍 Research Gaps Detection**: Highlight limitations and areas for future research
- **🚀 FastAPI Backend**: High-performance REST API
- **🤖 Local AI Processing**: Uses Ollama for complete privacy and offline operation
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Technology Stack

### Backend

- **FastAPI**: Modern, high-performance web framework
- **LangChain**: Framework for RAG applications
- **Ollama**: Local LLM inference (llama3.2 + nomic-embed-text)
- **FAISS**: Vector similarity search for document retrieval

### Frontend

- **React 18**: Modern UI library
- **Axios**: HTTP client
- **React Dropzone**: Drag & drop file uploads
- **React Markdown**: Render analysis results
- **Lucide React**: Beautiful icons
- **Framer Motion**: Smooth animations

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+ and npm
- Ollama installed and running

### Installation

#### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/AI-Research-Analyzer.git
   cd AI-Research-Analyzer
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Install and start Ollama:

   ```bash
   # Install Ollama from https://ollama.ai

   # Start Ollama service
   ollama serve

   # Pull required models (in another terminal)
   ollama pull llama3.2
   ollama pull nomic-embed-text
   ```

4. Start the FastAPI backend:
   ```bash
   python run.py
   ```
   The backend will run at http://localhost:8000

#### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install npm dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run at http://localhost:3000

## 📖 Usage

1. Open http://localhost:3000 in your browser
2. Drag & drop or click to upload a research paper PDF
3. Select analysis type:
   - **Key Insights**: Extract main findings and important points
   - **Research Gaps**: Identify limitations and future research directions
4. Click "Analyze Paper" and wait for AI analysis
5. View beautifully formatted results with markdown support

## 🔧 API Endpoints

### POST /api/analyze

Analyze a research paper

**Request:**

- `file`: PDF file (multipart/form-data)
- `query_type`: "Key Insights" or "Research Gaps"

**Response:**

```json
{
  "response": "Markdown formatted analysis",
  "sources": "Source information",
  "success": true,
  "error": null
}
```

### GET /api/health

Health check endpoint

## 🏗️ Architecture

The application uses Retrieval-Augmented Generation (RAG):

1. **Document Processing**: PDFs are loaded and split into chunks
2. **Vector Embedding**: Text chunks are converted to embeddings using Ollama
3. **Retrieval**: Relevant chunks are retrieved using FAISS vector search
4. **Generation**: Retrieved content is sent to Llama 3.2 with specialized prompts
5. **Response**: Structured markdown analysis is returned

## 🎨 Design Features

- **Modern gradient background** (purple theme inspired by Dribbble)
- **Glass-morphism effects** on cards
- **Smooth animations** and transitions
- **Drag & drop file upload** with visual feedback
- **Real-time loading states** and error handling
- **Responsive design** for all screen sizes
- **Clean typography** using Inter font

## 🚀 Building for Production

```bash
# Build React frontend
cd frontend
npm run build

# The build files will be in frontend/build/
# Uncomment static file mounting in app/main.py to serve from backend
```

## 📁 Project Structure

```
AI-Research-Analyzer/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI REST API
│   └── utils.py         # RAG processing
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.js
│   │   │   └── FileUpload.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── run.py
└── requirements.txt
```

## 🔮 Future Improvements

- Multiple document comparison
- Export results to PDF/DOCX
- Chat interface for follow-up questions
- Support for more document formats
- User authentication and history
- Advanced visualization of findings

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

- Built with [LangChain](https://github.com/langchain-ai/langchain)
- Powered by Azure OpenAI models
- Interface created with [Gradio](https://gradio.app/)
