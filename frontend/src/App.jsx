import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Setup from "./components/Setup";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

// NotFound component for unmatched routes
function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "var(--font-sans)",
      color: "var(--foreground)",
      backgroundColor: "var(--background)"
    }}>
      <h1 style={{ fontSize: "4rem", margin: "0", color: "var(--primary)" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Page Not Found</p>
      <a
        href="/"
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          textDecoration: "none",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-md)"
        }}
      >
        Go to Home
      </a>
    </div>
  );
}

function App() {
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/setup"
          element={<Setup setQuizData={setQuizData} />}
        />
        <Route
          path="/quiz"
          element={<Quiz quizData={quizData} setAnswers={setAnswers} />}
        />
        <Route
          path="/result"
          element={<Result quizData={quizData} answers={answers} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
