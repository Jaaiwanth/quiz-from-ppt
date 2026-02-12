import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import "../styles/Header.css";

function Header({ hideStartQuiz = false }) {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
                    <Brain className="logo-icon" size={32} strokeWidth={2.5} />
                    <span className="logo-text">QuizMaster</span>
                </div>

                {!hideStartQuiz && (
                    <nav className="header-nav">
                        <button
                            className="nav-button start-quiz-btn"
                            onClick={() => navigate("/setup")}
                        >
                            Start Quiz
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header;
