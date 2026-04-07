import { useState } from "react";
import { useApp } from "../context/AppContext";
import "./Auth.css";

const Auth = () => {
  const { login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);

  // Login form state
  const [username, setUsername] = useState("");

  // Signup form state
  const [signupUsername, setSignupUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emoji, setEmoji] = useState("😊");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupUsername.trim() && email.trim()) {
      signup(signupUsername.trim(), email.trim(), emoji);
    }
  };

  const emojiOptions = [
    "😊",
    "🎓",
    "📚",
    "🚀",
    "💡",
    "🌟",
    "🎯",
    "🔥",
    "⚡",
    "✨",
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">MCQ Generator</h1>
        <p className="auth-subtitle">AI-Powered Test Creation Platform</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emoji">Choose Your Avatar</label>
              <div className="emoji-selector">
                {emojiOptions.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className={`emoji-option ${emoji === e ? "selected" : ""}`}
                    onClick={() => setEmoji(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
