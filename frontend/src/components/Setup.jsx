import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Sparkles, ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import GradientBackground from "./GradientBackground";
import Header from "./Header";
import "../styles/Setup.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL =", API_BASE_URL);

function Setup({ setQuizData }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("ppt", file);

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      console.log("Quiz generated successfully");
      if (!data.quiz) {
        throw new Error("No quiz returned");
      }
      setQuizData(data.quiz);
      navigate("/quiz");
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError("");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  return (
    <div className="setup-page">
      <Header hideStartQuiz={true} />

      {/* Gradient Background */}
      <div className="setup-gradient-background">
        <GradientBackground />
      </div>

      <div className="setup-container">
        <div className="setup-content">
          {/* Back Button */}
          <button className="back-button" onClick={() => navigate("/")}>
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          {/* Header Section */}
          <div className="setup-header">
            <div className="setup-icon-badge">
              <Sparkles size={24} />
            </div>
            <h1 className="setup-title">Create Your Quiz</h1>
            <p className="setup-subtitle">
              Upload your study materials and let AI generate a personalized quiz for you
            </p>
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <div
              className={`upload-area ${dragActive ? "drag-active" : ""} ${file ? "has-file" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                accept=".ppt,.pptx,.pdf,.docx,.txt"
                className="file-input"
                onChange={handleFileChange}
              />

              <label htmlFor="file-upload" className="upload-label">
                {file ? (
                  <>
                    <CheckCircle className="upload-icon success" size={48} />
                    <div className="file-info">
                      <FileText size={20} />
                      <span className="file-name">{file.name}</span>
                    </div>
                    <p className="upload-text">File selected successfully!</p>
                    <button type="button" className="change-file-btn">
                      Change file
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="upload-icon" size={48} />
                    <p className="upload-text">
                      <strong>Click to upload</strong> or drag and drop
                    </p>
                    <p className="upload-hint">
                      PPT, PPTX, PDF, DOCX, or TXT (Max 10MB)
                    </p>
                  </>
                )}
              </label>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>

          {/* Features List */}
          <div className="setup-features">
            <div className="feature-item">
              <CheckCircle size={20} className="feature-icon" />
              <span>AI-powered question generation</span>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="feature-icon" />
              <span>Instant quiz creation</span>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="feature-icon" />
              <span>Multiple file format support</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            className="generate-button"
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating Quiz...
              </>
            ) : (
              <>
                <span>Generate Quiz</span>
                <ArrowRight size={20} className="button-icon" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setup;
