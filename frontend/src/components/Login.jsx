import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const s = {
    page: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--background)",
      padding: "2rem 1rem",
      fontFamily: "var(--font-sans)",
    },
    card: {
      width: "100%",
      maxWidth: "440px",
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "2.5rem",
      boxShadow: "var(--shadow-2xl)",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "0.625rem",
      marginBottom: "1.75rem",
    },
    brandName: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "var(--primary)",
      letterSpacing: "var(--tracking-tight)",
    },
    title: {
      fontSize: "1.55rem",
      fontWeight: 700,
      color: "var(--foreground)",
      margin: "0 0 0.45rem",
      lineHeight: 1.25,
      letterSpacing: "var(--tracking-tight)",
    },
    subtitle: {
      fontSize: "0.88rem",
      color: "var(--muted-foreground)",
      margin: "0 0 1.75rem",
      lineHeight: 1.5,
    },
    googleBtn: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.625rem",
      padding: "0.75rem 1.25rem",
      background: "var(--secondary)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      color: "var(--foreground)",
      fontSize: "0.92rem",
      fontWeight: 500,
      fontFamily: "var(--font-sans)",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.5 : 1,
      transition: "background 0.18s, box-shadow 0.18s",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      gap: "0.875rem",
      margin: "1.25rem 0",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "var(--border)",
    },
    dividerText: {
      fontSize: "0.78rem",
      color: "var(--muted-foreground)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wider)",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem",
    },
    label: {
      fontSize: "0.84rem",
      fontWeight: 500,
      color: "var(--foreground)",
    },
    inputBase: {
      width: "100%",
      padding: "0.72rem 1rem",
      background: "var(--input)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      color: "var(--foreground)",
      fontSize: "0.92rem",
      fontFamily: "var(--font-sans)",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.18s, box-shadow 0.18s",
    },
    inputFocused: {
      borderColor: "var(--ring)",
      boxShadow: "0 0 0 3px color-mix(in oklch, var(--primary) 20%, transparent)",
    },
    error: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.72rem 1rem",
      background: "color-mix(in oklch, var(--destructive) 15%, transparent)",
      border: "1px solid color-mix(in oklch, var(--destructive) 40%, transparent)",
      borderRadius: "var(--radius-sm)",
      color: "var(--destructive)",
      fontSize: "0.86rem",
    },
    submitBtn: {
      width: "100%",
      padding: "0.82rem 1.25rem",
      background: "var(--primary)",
      border: "none",
      borderRadius: "var(--radius-md)",
      color: "var(--primary-foreground)",
      fontSize: "0.96rem",
      fontWeight: 600,
      fontFamily: "var(--font-sans)",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.5 : 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "0.25rem",
      boxShadow: "var(--shadow-md)",
      letterSpacing: "var(--tracking-normal)",
      transition: "opacity 0.18s, transform 0.15s",
    },
    toggle: {
      textAlign: "center",
      marginTop: "1.25rem",
      fontSize: "0.88rem",
      color: "var(--muted-foreground)",
    },
    toggleBtn: {
      background: "none",
      border: "none",
      color: "var(--primary)",
      fontSize: "0.88rem",
      fontWeight: 600,
      fontFamily: "var(--font-sans)",
      cursor: "pointer",
      padding: 0,
    },
    backBtn: {
      display: "block",
      margin: "0.75rem auto 0",
      background: "none",
      border: "none",
      color: "var(--muted-foreground)",
      fontSize: "0.82rem",
      fontFamily: "var(--font-sans)",
      cursor: "pointer",
      padding: "0.25rem 0",
      opacity: 0.6,
    },
    spinner: {
      width: "18px",
      height: "18px",
      border: "2.5px solid color-mix(in oklch, var(--primary-foreground) 40%, transparent)",
      borderTopColor: "var(--primary-foreground)",
      borderRadius: "50%",
      display: "inline-block",
      animation: "spin 0.7s linear infinite",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await doCreateUserWithEmailAndPassword(email, password);
      } else {
        await doSignInWithEmailAndPassword(email, password);
      }
      navigate("/setup");
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await doSignInWithGoogle();
      navigate("/setup");
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  function getFriendlyError(code) {
    switch (code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/email-already-in-use":
        return "This email is already registered. Try signing in.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return "An error occurred. Please try again.";
    }
  }

  const inputStyle = (field) => ({
    ...s.inputBase,
    ...(focusedField === field ? s.inputFocused : {}),
  });

  return (
    <div style={s.page}>
      {/* spin keyframe via a hidden style tag */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={s.card}>
        <h2 style={s.title}>
          {isSignUp ? "Create your account" : "Welcome back"}
        </h2>
        <p style={s.subtitle}>
          {isSignUp
            ? "Join QuizMaster to start your learning journey"
            : "Sign in to continue your learning journey"}
        </p>

        {/* Google */}
        <button style={s.googleBtn} onClick={handleGoogle} disabled={loading} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={s.divider}>
          <span style={s.dividerLine} />
          <span style={s.dividerText}>or</span>
          <span style={s.dividerLine} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.formGroup}>
            <label style={s.label} htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              style={inputStyle("email")}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              autoComplete="email"
            />
          </div>

          <div style={s.formGroup}>
            <label style={s.label} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              style={inputStyle("password")}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
          </div>

          {isSignUp && (
            <div style={s.formGroup}>
              <label style={s.label} htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                style={inputStyle("confirmPassword")}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                required
                autoComplete="new-password"
              />
            </div>
          )}

          {error && (
            <div style={s.error} role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading
              ? <span style={s.spinner} />
              : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p style={s.toggle}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            style={s.toggleBtn}
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        <button type="button" style={s.backBtn} onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;
