// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../style.css";
import targetLogo from "../assets/target.png";
import EVENT1 from "../assets/EVENT1.jpg";
import EVENT2 from "../assets/EVENT2.jpg";
import EVENT3 from "../assets/EVENT3.jpg";
import BIRTHDAYS from "../assets/BIRTHDAYS.jpeg";
import WEDDING from "../assets/WEDDING.jpg";
import CONCERTS from "../assets/CONCERTS.jpg";
import HAPPY from "../assets/Happy Streets.jpg";
import FEST from "../assets/COLLEGE FEST.jpg";
import CONF from "../assets/CONFERENCES.jpg";

const Home = () => {
  const quotes = [
    "🎤 From Fairy Tale 👸 Weddings to Pro-Level 🏛️ Events – Magic Happens Here!",
    "🎉 Creating Moments. Making Memories. Cherishing Forever. 💫",
    "💍 Elegant Weddings • 🎓 College Fests • 🎂 Birthdays • 🏙️ Conferences",
    "🎭 Your Dream, Our Team – Let’s Make it Grand! 🌟",
    "💖 Crafting Joyful Celebrations with Passion and Style ✨"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="main-header">
        <div className="logo">
          <img src={targetLogo} alt="Elite Events Logo" />
          <h1>ELITE EVENTS</h1>
        </div>
        <Navbar />
      </header>

      <div className="quotes-container">
        <p id="quote-text" style={{ textAlign: "center" }}>{quotes[index]}</p>
      </div>

      <section className="about-section">
        <div className="about-text">
          <h2>🌟 ABOUT US 🌟</h2>
          <p>
            At <span>Elite Events</span>, we turn your dream moments into dazzling memories! 💖
            From fairytale 👑 weddings to electrifying 🎶 concerts, we bring magic, creativity 🎨,
            and perfect planning 🛠️ to every celebration.
          </p>
          <p>
            Our team of experts 🎯 ensures every event is unique, vibrant 🌈, and unforgettable ✨.
            Whether you're planning a cozy birthday party 🎂 or a grand college fest 🏰,
            we've got your back!
          </p>
          <p>✨ We don’t just organize events – we craft experiences you'll cherish forever. 🎉</p>
        </div>

        <div className="about-images">
          <img src={EVENT1} alt="Image 1" />
          <img src={EVENT2} alt="Image 2" />
          <img src={EVENT3} alt="Image 3" />
        </div>
      </section>

      <section className="services-section">
        <h2>OUR SERVICES</h2>
        <div className="services-grid">
          <div className="service-item">
            <img src={BIRTHDAYS} alt="Birthdays Icon" />
            <h3>Birthdays</h3>
            <p>Colorful, themed, and full of joy!</p>
          </div>
          <div className="service-item">
            <img src={WEDDING} alt="Weddings Icon" />
            <h3>Weddings</h3>
            <p>Magical moments tailored to your love story.</p>
          </div>
          <div className="service-item">
            <img src={CONCERTS} alt="Concerts Icon" />
            <h3>Concerts</h3>
            <p>Loud, live, and unforgettable performances!</p>
          </div>
          <div className="service-item">
            <img src={HAPPY} alt="Happy Streets Icon" />
            <h3>Happy Streets</h3>
            <p>Community vibes, great fun, and open-air experiences!</p>
          </div>
          <div className="service-item">
            <img src={FEST} alt="College Fests Icon" />
            <h3>College Fests</h3>
            <p>Culture, flair, and youth energy unleashed!</p>
          </div>
          <div className="service-item">
            <img src={CONF} alt="Conferences Icon" />
            <h3>Conferences</h3>
            <p>Professional, polished, and perfectly managed.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="why-choose">
          <h2>Why Choose Elite Events?</h2>
          <ul>
            <li>✨ Custom Themes</li>
            <li>⚙️ One-Stop Services</li>
            <li>💡 Creative Team</li>
            <li>💰 Budget-Friendly</li>
            <li>⏰ Always On-Time</li>
            <li>💻 Tech-Smart Planning</li>
            <li>🎉 All Event Types</li>
          </ul>
        </div>
        <div className="get-in-touch">
          <h2>Get in Touch With Us</h2>
          <p>📍 Location: Coimbatore, Tamil Nadu</p>
          <p>✉️ Email: contact@eliteevents.com</p>
          <p>📞 Phone: +91 98765 43210</p>
          <h2>Follow Us On:</h2>
          <p>📷 Instagram</p>
          <p>📘 Facebook</p>
          <p>🔗 LinkedIn</p>
          <label>
            <input type="checkbox" /> Subscribe for updates and be the first to know about offers, trends, and upcoming events!
          </label>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Elite Events. All rights reserved.</p>
        <p>Designed with 💖 by Harshini.</p>
      </footer>
    </>
  );
};

export default Home;
