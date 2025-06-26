import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  const quotes = [
    "“Turning Moments into Memories”",
    "“Celebrate Every Moment”",
    "“Your Vision, Our Mission”",
    "“Crafting Unforgettable Experiences”",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const match = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!match) {
      alert("User not found. Please register first.");
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(match));
      navigate("/dashboard");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>🔐 Login to Elite Events</h2>
        <div className="quote">{quotes[quoteIndex]}</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login 🚀</button>
        </form>
        <div className="redirect">
          🌟 New here?
          <br />
          <Link to="/register">👉 Register your account</Link>
          <div className="back-home">
  <Link to="/" className="home-link">🏠 Back to Home</Link>
</div>
        </div>
      </div>
      </div>
    
  );
  
};

export default Login;
