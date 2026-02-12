import { useNavigate } from "react-router-dom";
import "../styles/Result.css";

function Result({ quizData, answers }) {
  const navigate = useNavigate();
  let score = 0;

  quizData.forEach((q, index) => {
    if (answers[index] === q.answer) {
      score++;
    }
  });

  return (
    <div className="result-container">
      <h1 className="result-title">Result Page</h1>

      <p className="score-display">
        Your score is: {score} / {quizData.length}
      </p>

      <button
        className="restart-button"
        onClick={() => navigate("/setup")}
      >
        Upload Another File
      </button>
    </div>
  );
}

export default Result;
