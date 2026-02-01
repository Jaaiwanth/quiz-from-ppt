import "../styles/Result.css";

function Result({ setPage, quizData, answers }) {
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
        onClick={() => setPage("setup")}
      >
        Upload Another File
      </button>
    </div>
  );
}

export default Result;
