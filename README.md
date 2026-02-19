# AI Research Gap Finder

A modern web application that uses **Retrieval-Augmented Generation (RAG)** to analyze research papers and extract key insights or identify research gaps. Built with **FastAPI** and **React**, it optimizes for speed and user experience.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- **📄 Multi-Format Support**: Analyze research papers from **PDF**, **DOCX**, **URLs (including arXiv/DOI)**, or **Pasted Text**.
- **🧠 AI-Powered Analysis**: Automatically extract **Key Insights** or identify **Research Gaps** using advanced LLMs (Llama 3).
- **💬 Interactive Chat**: Ask follow-up questions and chat directly with the document context.
- **📊 Modern Dashboard**: centralized view to manage "My Documents", "Previous Analyses", and "Exports".
- **🎨 Custom Functionality**:
    - **Dark/Light Mode**
    - **Adjustable Font Sizes**
    - **Responsive Design** for desktop and mobile
- **⚡ Flexible Inference**:
    - **Groq (Default)**: Lightning-fast cloud inference with Llama 3.3.
    - **Ollama**: Private, local inference with Llama 3.2.

---

## 🛠️ Technology Stack

### Backend
- **FastAPI**: High-performance REST API.
- **LangChain**: RAG framework for document processing and retrieval.
- **FAISS**: Efficient vector similarity search.
- **PyPDF / Docx2txt**: Document parsing.
- **Sentence Transformers**: High-quality text embeddings (`all-MiniLM-L6-v2`).

### Frontend
- **React 18**: Component-based UI.
- **Tailwind CSS**: Modern utility-first styling.
- **Framer Motion**: Smooth animations.
- **Lucide React**: Crisp, consistent icons.
- **Axios**: API integration.
- **React Markdown**: Rendering rich text analysis results.

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.8+**
- **Node.js 16+** and npm
- **(Optional) Groq API Key**: For fast cloud inference (Recommended).
- **(Optional) Ollama**: For local offline inference.

### Installation

#### 1. Backend Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/AI-Research-Gap-Finder.git
cd AI-Research-Gap-Finder

# Install Python dependencies
pip install -r requirements.txt
```

**Configuration (.env):**
Create a `.env` file in the root directory:

```env
# Option 1: Use Groq (Recommended for speed)
LLM_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key_here

# Option 2: Use Ollama (Local)
# LLM_PROVIDER=ollama
```

Start the backend server:

```bash
python run.py
```
*The backend runs at `http://localhost:8000`.*

#### 2. Frontend Setup

Open a new terminal and set up the React frontend:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
*The frontend runs at `http://localhost:3000`.*

---

## 📖 Usage

1. **Dashboard**: Access your central hub to see recent uploads and quick actions.
2. **Analysis**:
   - **Upload**: Drag & drop a PDF/DOCX file.
   - **Text/URL**: Switch tabs to paste text or enter a URL/DOI.
   - **Config**: Select "Key Insights" or "Research Gaps".
3. **Results**: View the structured analysis in markdown format.
4. **Chat**: Use the chat interface on the right (or bottom on mobile) to ask specific questions about the paper.
5. **Settings**: Toggle themes or adjust font size in the Settings page.

---

## 📁 Project Structure

```
AI-Research-Gap-Finder/
├── app/                        # FastAPI Backend
│   ├── main.py                 # API Endpoints
│   ├── utils.py                # RAG Logic & LLM Integration
│   └── ...
├── frontend/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # UI Components
│   │   │   ├── AnalysisConfig.js
│   │   │   ├── AnalysisResultsCard.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── SettingsPage.js
│   │   │   ├── UploadCard.js
│   │   │   └── ...
│   │   ├── contexts/           # State Management (Theme)
│   │   ├── App.js              # Main Router
│   │   └── index.css           # Tailwind Styles
│   └── package.json
├── requirements.txt            # Python Dependencies
├── run.py                      # Server Entry Script
└── README.md                   # Project Documentation
```

## 🔮 Future Improvements

- User Authentication & Histories.
- Multi-document comparison (Cross-paper analysis).
- Export analysis to PDF/DOCX directly.
- Advanced visualization of citations and references.

## 📄 License

This project is licensed under the MIT License.
