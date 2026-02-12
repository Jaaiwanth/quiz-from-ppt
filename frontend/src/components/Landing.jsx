import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Upload,
  Bot,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
  Palette,
  RefreshCw,
  Moon,
  Clock,
  GraduationCap,
  Rocket,
  Mail,
  Globe,
  ArrowRight,
  Heart
} from "lucide-react";

import GradientBackground from "./GradientBackground";
import Header from "./Header";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        {/* Gradient Background */}
        <div className="hero-gradient-background">
          <GradientBackground />
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} className="badge-icon" />
            AI-Powered Quiz Generation
          </div>
          <h1 className="hero-title">
            Transform Your Learning
            <span className="gradient-text"> Experience</span>
          </h1>
          <p className="hero-subtitle">
            Upload your lecture files and let AI create engaging quizzes instantly.
            Test your knowledge, track progress, and master any subject.
          </p>
          <button
            className="cta-button"
            onClick={() => navigate("/setup")}
          >
            <span>Get Started</span>
            <ArrowRight className="arrow-icon" size={20} />
          </button>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <Upload className="card-icon" size={40} strokeWidth={2} />
            <div className="card-text">Upload Content</div>
          </div>
          <div className="floating-card card-2">
            <Bot className="card-icon" size={40} strokeWidth={2} />
            <div className="card-text">AI Processing</div>
          </div>
          <div className="floating-card card-3">
            <CheckCircle className="card-icon" size={40} strokeWidth={2} />
            <div className="card-text">Take Quiz</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">Everything you need for effective learning</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Target className="feature-icon" size={48} strokeWidth={2} />
            <h3 className="feature-title">Smart Question Generation</h3>
            <p className="feature-description">
              AI analyzes your content and creates relevant, challenging questions automatically.
            </p>
          </div>

          <div className="feature-card">
            <Zap className="feature-icon" size={48} strokeWidth={2} />
            <h3 className="feature-title">Instant Results</h3>
            <p className="feature-description">
              Get immediate feedback on your answers with detailed explanations.
            </p>
          </div>

          <div className="feature-card">
            <BarChart3 className="feature-icon" size={48} strokeWidth={2} />
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-description">
              Monitor your performance and identify areas for improvement.
            </p>
          </div>

          <div className="feature-card">
            <Palette className="feature-icon" size={48} strokeWidth={2} />
            <h3 className="feature-title">Beautiful Interface</h3>
            <p className="feature-description">
              Enjoy a modern, intuitive design that makes learning enjoyable.
            </p>
          </div>

          <div className="feature-card">
            <RefreshCw className="feature-icon" size={48} strokeWidth={2} />
            <h3 className="feature-title">Multiple Formats</h3>
            <p className="feature-description">
              Support for various file types including PDFs, PPTs, and documents.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in three simple steps</p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Upload Your Content</h3>
              <p className="step-description">
                Upload your lecture notes, presentations, or study materials in any supported format.
              </p>
            </div>
          </div>

          <ArrowRight className="step-connector-icon" size={32} strokeWidth={2.5} />

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">AI Generates Quiz</h3>
              <p className="step-description">
                Our AI analyzes your content and creates customized quiz questions instantly.
              </p>
            </div>
          </div>

          <ArrowRight className="step-connector-icon" size={32} strokeWidth={2.5} />

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Test & Learn</h3>
              <p className="step-description">
                Take the quiz, get instant feedback, and track your progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose QuizMaster?</h2>
          <p className="section-subtitle">Benefits that make a difference</p>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <Clock className="benefit-icon" size={48} strokeWidth={2} />
            <h3 className="benefit-title">Save Time</h3>
            <p className="benefit-description">
              No more manual quiz creation. Generate comprehensive quizzes in seconds.
            </p>
          </div>

          <div className="benefit-card">
            <GraduationCap className="benefit-icon" size={48} strokeWidth={2} />
            <h3 className="benefit-title">Better Retention</h3>
            <p className="benefit-description">
              Active recall through quizzes improves long-term memory retention.
            </p>
          </div>

          <div className="benefit-card">
            <Target className="benefit-icon" size={48} strokeWidth={2} />
            <h3 className="benefit-title">Focused Learning</h3>
            <p className="benefit-description">
              Identify weak areas and focus your study efforts where they matter most.
            </p>
          </div>

          <div className="benefit-card">
            <Rocket className="benefit-icon" size={48} strokeWidth={2} />
            <h3 className="benefit-title">Faster Mastery</h3>
            <p className="benefit-description">
              Accelerate your learning with targeted practice and instant feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2026 QuizMaster
        </p>
      </footer>
    </div>
  );
}

export default Landing;
