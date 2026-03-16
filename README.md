# 📝 AI Quiz Generator

An AI-powered quiz generation tool that extracts text from uploaded documents and automatically generates multiple choice questions using Google Gemini.

---

## 🚀 Features

- Upload documents in **PPTX, PDF, DOCX, or TXT** format
- Automatically extracts text content using a Python backend
- Generates **5 multiple choice questions** per document using **Gemini 2.5 Flash**
- Returns clean, structured JSON quiz data

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Backend (API) | Node.js, Express |
| File Upload | Multer |
| Text Extraction | Python (`python-pptx`, `pdfplumber`, `python-docx`) |
| AI / LLM | Google Gemini API (`gemini-2.5-flash`) |
| Env Config | dotenv |

---

## 📁 Project Structure

```
├── README.md                       # Project documentation
├── .gitignore                      # Files ignored by Git
│
├── backend/
│   ├── server.js                   # Express server & API routes
│   ├── extract_ppt_text.py         # Text extraction (PPTX, PDF, DOCX, TXT)
│   ├── requirements.txt            # Python dependencies
│   ├── package.json
│   ├── package-lock.json
│   └── uploads/                    # Temp file storage (auto-created)
│
└── frontend/
    ├── vite.config.js
    ├── package.json
    ├── package-lock.json
    └── src/
        └── components/
            ├── Landing.jsx         # Home / entry screen
            ├── Setup.jsx           # File upload & quiz configuration
            ├── Quiz.jsx            # Renders MCQs & handles answer selection
            ├── Result.jsx          # Displays final score
            ├── Header.jsx          # Top navigation bar
            ├── FloatingLines.jsx   # Background animation
            ├── GradientBackground.jsx  # Gradient background styling
            └── Orb.jsx             # Decorative UI element
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v18+)
- Python 3.x
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Node dependencies

```bash
cd backend
npm install
```

### 3. Install Python dependencies

```bash
pip install -r backend/requirements.txt
```

### 4. Configure environment variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the backend server

```bash
cd backend
node server.js
```

### 6. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` and the backend at `http://localhost:3000`.

---

## 📡 API Usage

### `POST /upload`

Upload a document to generate quiz questions.

**Request:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `ppt` | File | Document file (`.pptx`, `.pdf`, `.docx`, `.txt`) |

**Response:**

```json
{
  "quiz": [
    {
      "question": "What is ...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "answer": "A. ..."
    }
  ]
}
```

---

## 🔒 Notes

- Uploaded files are automatically deleted from the server after processing.
- The `.env` file should never be committed. Add it to `.gitignore`.
- Gemini response parsing strips markdown code fences before JSON parsing.

---

## 📄 License

MIT
