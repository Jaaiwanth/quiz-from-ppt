import { useNavigate } from "react-router-dom";
import "../styles/Result.css";

function Result({ quizData, answers }) {
  const navigate = useNavigate();
  let score = 0;

  quizData.forEach((q, index) => {
    if (answers[index] === q.answer) score++;
  });

  const percentage = quizData.length > 0
    ? Math.round((score / quizData.length) * 100)
    : 0;

  const getScoreLabel = () => {
    if (percentage >= 80) return { label: "Excellent!", cls: "score-excellent" };
    if (percentage >= 50) return { label: "Good Job!", cls: "score-good" };
    return { label: "Keep Practicing!", cls: "score-poor" };
  };

  const { label, cls } = getScoreLabel();

  return (
    <div className="result-page">
      {/* Score Summary Card */}
      <div className="result-summary-card">
        <h1 className="result-title">Quiz Results</h1>
        <div className={`score-circle ${cls}`}>
          <span className="score-number">{score}/{quizData.length}</span>
        </div>
        <p className="score-label">{label}</p>
        <button className="restart-button" onClick={() => navigate("/setup")}>
          Upload Another File
        </button>
      </div>

      {/* Per-question breakdown */}
      <div className="questions-breakdown">
        {quizData.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === q.answer;
          const isUnanswered = userAnswer === undefined || userAnswer === null;

          return (
            <div
              key={index}
              className={`question-card ${isCorrect ? "card-correct" : isUnanswered ? "card-unanswered" : "card-wrong"}`}
            >
              <div className="question-card-header">
                <span className="question-index">Q{index + 1}</span>
                <span className={`result-badge ${isCorrect ? "badge-correct" : isUnanswered ? "badge-unanswered" : "badge-wrong"}`}>
                  {isCorrect ? "✓ Correct" : isUnanswered ? "— Skipped" : "✗ Incorrect"}
                </span>
              </div>

              <p className="question-text">{q.question}</p>

              <ul className="options-list">
                {q.options.map((option, i) => {
                  const isCorrectOption = option === q.answer;
                  const isUserChoice = option === userAnswer;

                  let optionClass = "option-item";
                  if (isCorrectOption) optionClass += " option-correct";
                  else if (isUserChoice && !isCorrectOption) optionClass += " option-wrong";

                  return (
                    <li key={i} className={optionClass}>
                      <span className="option-marker">
                        {isCorrectOption ? "✓" : isUserChoice ? "✗" : ""}
                      </span>
                      {option}
                      {isUserChoice && !isCorrectOption && (
                        <span className="your-answer-tag">Your answer</span>
                      )}
                      {isCorrectOption && (
                        <span className="correct-answer-tag">Correct answer</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result;
