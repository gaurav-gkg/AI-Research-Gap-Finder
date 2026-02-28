# AI Research Gap Finder

> A full-stack web application that leverages **Retrieval-Augmented Generation (RAG)** to analyze research papers — extracting key insights or identifying research gaps in seconds.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **Multi-Format Input** | Upload **PDF**, **DOCX**, paste text, or provide a **URL / arXiv / DOI** link |
| 🧠 **AI-Powered Analysis** | Extract **Key Insights** or identify **Research Gaps** using Llama 3 |
| 💬 **Interactive Chat** | Ask follow-up questions about the document in real time |
| 🔐 **Authentication** | Secure **Google Sign-In** (OAuth 2.0) with persistent sessions |
| 🗄️ **Analysis History** | Per-user history stored in **Supabase**, accessible from the dashboard |
| 📤 **Export Results** | Download analysis as **PDF**, **DOCX**, or **CSV** |
| 🎨 **Theming** | Dark / Light mode and adjustable font sizes |
| ⚡ **Flexible Inference** | **Groq** (fast cloud) or **Ollama** (local/offline) |

---

## 🛠️ Technology Stack

### Backend
| Library | Role |
|---|---|
| **FastAPI** | High-performance REST API |
| **LangChain** | RAG pipeline — document loading, splitting, retrieval |
| **FAISS** | Vector similarity search |
| **Sentence Transformers** | Text embeddings (`all-MiniLM-L6-v2`) |
| **PyPDF / Docx2txt** | Document parsing |
| **Groq / Ollama** | LLM inference providers |

### Frontend
| Library | Role |
|---|---|
| **React 18** | Component-based UI |
| **Tailwind CSS** | Utility-first styling |
| **Axios** | HTTP client for API calls |
| **React Markdown** | Render structured analysis output |
| **React Dropzone** | Drag-and-drop file upload |
| **jsPDF** | Client-side PDF export |
| **@react-oauth/google** | Google OAuth 2.0 Sign-In |
| **Supabase JS** | User data & analysis history persistence |
| **Lucide React** | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- Python **3.8+**
- Node.js **16+** and npm
- A [Groq API Key](https://console.groq.com/) *(recommended)* or [Ollama](https://ollama.com/) for local inference
- A [Google OAuth Client ID](https://console.cloud.google.com/) for authentication
- A [Supabase](https://supabase.com) project for history persistence

---

### 1. Backend Setup

```bash
git clone https://github.com/your-username/AI-Research-Analyzer.git
cd AI-Research-Analyzer

pip install -r requirements.txt
```

Start the backend:

```bash
python run.py
```

> API runs at `http://localhost:8000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

> App runs at `http://localhost:3000`

---

## 📖 Usage

1. **Sign In** — Click *Sign in with Google* to authenticate (required for analysis and history).
2. **Input** — Drag & drop a PDF/DOCX, paste text, or enter a URL/DOI.
3. **Configure** — Choose *Key Insights* or *Research Gaps* and adjust analysis settings.
4. **Analyze** — View the structured markdown results.
5. **Chat** — Ask the AI follow-up questions directly about the paper.
6. **Export** — Download results via the Exports page (PDF, DOCX, or CSV).
7. **Settings** — Switch between Dark/Light mode or adjust font size.

---

## 📁 Project Structure

```
AI-Research-Analyzer/
├── app/
│   ├── main.py              # FastAPI endpoints (analyze, chat, text, URL)
│   ├── utils.py             # RAG logic & LLM integration
│   └── __init__.py
├── frontend/
│   └── src/
│       ├── components/      # Page & UI components
│       ├── contexts/
│       │   ├── AuthContext.js      # Google OAuth session management
│       │   ├── HistoryContext.js   # Supabase-backed analysis history
│       │   └── ThemeContext.js
│       ├── lib/
│       │   └── supabaseClient.js
│       ├── App.js           # Routing & main layout
│       └── index.css        # Tailwind base styles
├── requirements.txt
├── run.py
└── README.md
```

---

## 🔮 Roadmap

- [ ] Multi-document comparison and cross-paper analysis
- [ ] Citation graph and reference network visualization
- [ ] Batch upload and bulk analysis

---


