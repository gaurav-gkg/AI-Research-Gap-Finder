# Research Paper Analyzer - Academic Dashboard

## 🎓 Design Philosophy

This interface is designed to be **research-oriented and professional**, similar to academic platforms like ZeroEssay's Research Writer. The design focuses on:

- **Academic credibility** - Clean, structured, trustworthy interface
- **Professional aesthetics** - Light theme with subtle accents
- **Clarity over flashiness** - No AI hype, focus on functionality
- **Desktop-first approach** - Optimized for research workflows

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+ and npm
- Ollama installed and running

### Backend Setup

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Start Ollama service (in a separate terminal):

```bash
ollama serve
```

3. Pull required Ollama models:

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

4. Start the FastAPI backend:

```bash
cd ..
python run.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎨 Design Features

### Layout Structure

- **Left Sidebar Navigation**: Persistent navigation with brand, menu items, and usage stats
- **Main Content Area**: Spacious workspace for analysis configuration and results
- **Light Theme**: `#F7F9FB` background with white cards and soft shadows

### Key Components

#### 1. Sidebar

- Clean icon + text navigation
- Active state highlighting
- Usage statistics footer
- Plan information (Free/Pro)

#### 2. Analysis Settings

Controlled, academic configuration:

- Document Type (Auto Detect, Research Paper, Survey, Thesis)
- Domain (Auto Detect, Computer Science, Healthcare, Social Sciences)
- Analysis Depth (Basic, Standard, Deep)
- Include Citations (Yes/No)
- Output Style (Bullet Points, Structured Report)

#### 3. Upload Section

- Large dashed border upload area
- Support for PDF and DOCX files
- "Use only uploaded document" toggle for trust
- Clean, professional styling

#### 4. Results Display

- **Document Overview**: Metadata cards (title, type, domain, suitability)
- **Key Findings**: Structured analysis results
- **Research Gaps**: Individual gap cards with:
  - Gap title
  - Description
  - Confidence level (High/Medium/Low)
  - Color-coded badges
- **Limitations & Notes**: Warning banner with validation reminders

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Dropzone** - File upload
- **React Markdown** - Content rendering
- **Lucide React** - Professional icons

### Backend

- **FastAPI** - Modern Python web framework
- **LangChain** - RAG framework
- **Ollama** - Local LLM (llama3.2 + nomic-embed-text)
- **FAISS** - Vector database

## 📐 Design Guidelines

### Colors

- Background: `#F7F9FB`
- Cards: White with soft shadows
- Accent Blue: `#3B82F6` (academic-blue)
- Accent Green: `#10B981` (academic-green)
- Accent Purple: `#8B5CF6` (academic-purple)

### Typography

- Font: Inter (System UI fallback)
- Section headers: Medium bold
- Body text: Regular, highly readable
- Generous vertical spacing

### What We Avoid

- ❌ No chatbot interfaces
- ❌ No typing animations
- ❌ No "Ask AI" prompts
- ❌ No flashy gradients or neon effects
- ❌ No AI assistant language

### What We Embrace

- ✅ University-grade research platform aesthetic
- ✅ Structured, predictable workflows
- ✅ Evidence-based confidence indicators
- ✅ Academic color palette
- ✅ Professional, trustworthy design

## 🎯 Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Configure analysis settings (document type, domain, depth)
4. Upload a research paper (PDF or DOCX)
5. Check "Use only uploaded document for analysis" (recommended)
6. Click "Run Gap Analysis"
7. Review structured results with confidence indicators

## 📦 Building for Production

```bash
npm run build
```

Built files will be in `frontend/build/`

## 📝 License

MIT License
