import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">
          Trivia Quiz App
        </h1>

        <p className="landing-subtitle">
          A React-based quiz app that dynamically fetches trivia questions from the Gemini API.
        </p>

        <button
          className="start-button"
          onClick={() => navigate("/setup")}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Landing;
