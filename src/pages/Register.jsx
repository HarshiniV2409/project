import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style.css";

const Register = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const quotes = [
    "Turning Moments into Memories",
    "Celebrate Every Moment",
    "Your Vision, Our Mission",
    "Crafting Unforgettable Experiences",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, confirm } = formData;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    if (users.some((u) => u.email === email)) {
      alert("Email already registered!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));
    navigate("/login");
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>📝 Register for Elite Events</h2>
        <p className="quote">{quotes[quoteIndex]}</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit">Register 🌟</button>
        </form>
        <p className="redirect">
          👋 Already a member?<br />
          <Link to="/login">👉 Login to your account</Link>
        </p>
        <div className="back-home">
  <Link to="/" className="home-link">🏠 Back to Home</Link>
</div>
      </div>
    </div>
  );
};

export default Register;
