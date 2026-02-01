// --------------------
// BASIC IMPORTS
// --------------------
import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --------------------
// ENV + PATH FIX
// --------------------
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// APP INIT
// --------------------
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// --------------------
// GEMINI INIT
// --------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --------------------
// ENSURE UPLOADS DIR EXISTS (DOCKER SAFE)
// --------------------
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// --------------------
// MULTER (FILE UPLOAD)
// --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// --------------------
// HEALTH CHECK
// --------------------
app.get("/", (req, res) => {
  res.send("✅ Docker + Python backend running");
});

// --------------------
// UPLOAD ROUTE (MAIN LOGIC)
// --------------------
app.post("/upload", upload.single("ppt"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    console.log("📥 File received:", req.file.originalname);
    const pptPath = req.file.path;
    const scriptPath = path.join(__dirname, "extract_ppt_text.py");

    // --------------------
    // DOCKER-SAFE PYTHON CALL
    // --------------------
    const command = `python "${scriptPath}" "${pptPath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Python execution error");
        console.error(stderr);
        return res.status(500).json({ error: "Python failed" });
      }
      console.log("🐍 Python raw output:", stdout);
      const data = JSON.parse(stdout);

      // --------------------
      // SEND TEXT TO GEMINI
      // --------------------
      const model = genAI.getGenerativeModel({
              model: "gemini-2.5-flash"
, // STABLE MODEL
      });

      const prompt = `
You are an AI tutor.

From the following lecture content, generate 5 multiple choice questions.

Rules:
- Each question must have 4 options
- Clearly mention the correct answer
- Return ONLY valid JSON
- No explanations

Format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": ""
  }
]

LECTURE CONTENT:
${data.text}
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log("🤖 Gemini raw response:");
      console.log(responseText);
      const cleanJSON = responseText
        .replace(/```json|```/g, "")
        .trim();

      const quiz = JSON.parse(cleanJSON);

      // Cleanup uploaded file
      fs.unlinkSync(pptPath);

      res.json({ quiz });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
