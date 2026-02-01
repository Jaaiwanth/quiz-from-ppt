import { useState } from "react";
import "./App.css";
import Landing from "./components/Landing";
import Setup from "./components/Setup";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  const [page, setPage] = useState("landing");

  // Quiz data from backend
  const [quizData, setQuizData] = useState([]);

  // User answers
  const [answers, setAnswers] = useState({});

  return (
    <>
      {page === "landing" && <Landing setPage={setPage} />}

      {page === "setup" && (
        <Setup
          setPage={setPage}
          setQuizData={setQuizData}
        />
      )}

      {page === "quiz" && (
        <Quiz
          setPage={setPage}
          quizData={quizData}
          setAnswers={setAnswers}
        />
      )}

      {page === "result" && (
        <Result
          setPage={setPage}
          quizData={quizData}
          answers={answers}
        />
      )}
    </>
  );
}

export default App;
