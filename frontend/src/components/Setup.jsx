import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Setup.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL =", API_BASE_URL);
function Setup({ setQuizData }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const res = await fetch(
        `${API_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

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

  return (
    <div className="setup-container">
      <h1 className="setup-title">Upload Lecture File</h1>

      <div className="form-group">
        <input
          type="file"
          accept=".ppt,.pptx,.pdf,.docx,.txt"
          className="form-select"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="start-button"
        onClick={handleUpload}
        disabled={loading}
      >
        {loading ? "Generating Quiz..." : "Generate Quiz"}
      </button>
    </div>
  );
}

export default Setup;
