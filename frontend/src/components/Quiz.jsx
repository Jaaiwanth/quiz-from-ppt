import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css";

function Quiz({ quizData, setAnswers }) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (!quizData || !quizData.length) return;

    const currentQuestion = quizData[currentIndex];

    if (!currentQuestion?.options) return;

    const options = [...currentQuestion.options].sort(
      () => Math.random() - 0.5
    );

    setShuffledOptions(options);
    setSelectedOption(null);
  }, [currentIndex, quizData]);

  if (!quizData || !quizData.length) {
    return <h2>No questions found</h2>;
  }

  const question = quizData[currentIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    setAnswers(prev => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  return (
    <div className="quiz-container">
      <h3 className="question-number">
        Question {currentIndex + 1} of {quizData.length}
      </h3>

      <h2 className="question-text">
        {question.question}
      </h2>

      <div className="options-container">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? "selected" : ""
              }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        <button
          className="nav-button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(i => i - 1)}
        >
          Previous
        </button>

        <button
          className="nav-button"
          disabled={currentIndex === quizData.length - 1}
          onClick={() => setCurrentIndex(i => i + 1)}
        >
          Next
        </button>
      </div>

      <button
        className="submit-button"
        onClick={() => navigate("/result")}
      >
        Submit
      </button>
    </div>
  );
}

export default Quiz;
