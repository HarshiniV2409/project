// Join.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style.css';
import targetLogo from '../assets/target.png';
import EVENT1 from "../assets/EVENT1.jpg";
import EVENT2 from "../assets/EVENT2.jpg";
import EVENT3 from "../assets/EVENT3.jpg";
import BIRTHDAYS from "../assets/BIRTHDAYS.jpeg";
import WEDDING from "../assets/WEDDING.jpg";
import CONCERTS from "../assets/CONCERTS.jpg";
import HAPPY from "../assets/Happy Streets.jpg";
import FEST from "../assets/COLLEGE FEST.jpg";
import CONF from "../assets/CONFERENCES.jpg";

const Navbar = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <img src={targetLogo} alt="Elite Events Logo" />
        <h1 style={{ color: '#ffd700', fontFamily: 'Poppins, sans-serif', fontSize: '1.8em' }}>ELITE EVENTS</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/create">CREATE EVENT</Link></li>
          <li><Link to="/join">JOIN EVENT</Link></li>
          <li><Link to="/dashboard">DASHBOARD</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const Join = () => {
  const navigate = useNavigate();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [events, setEvents] = useState([]);

  const quotes = [
    "Crafting Unforgettable Experiences",
    "Celebrate Every Moment",
    "Turning Moments into Memories",
    "Your Vision, Our Mission"
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login to join an event.");
      navigate("/login");
      return;
    }

    fetch("/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = (event) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    fetch("/api/join", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...event, user: user.email })
    })
      .then(() => {
        alert("🎉 You have successfully joined the event! Get ready to go!");
        navigate("/dashboard");
      });
  };

  return (
    <>
      <Navbar />
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>🎉 Join an Event</h2>
        <div style={styles.quote}>{quotes[quoteIndex]}</div>

        <div style={styles.cardGrid}>
          {events.map((event, index) => (
            <div key={index} style={styles.card}>
              {event.image && (
                <img src={event.image} alt={event.type} style={styles.image} />
              )}
              <h3 style={styles.eventName}>{event.name}</h3>
              <p style={styles.text}><strong>Type:</strong> {event.type}</p>
              <p style={styles.text}><strong>Date:</strong> {event.date}</p>
              <p style={styles.text}><strong>Time:</strong> {event.time}</p>
              <p style={styles.text}><strong>Venue:</strong> {event.venue}</p>
              <p style={styles.text}>{event.details}</p>
              <button onClick={() => handleJoin(event)} style={styles.button}>
                Join Event ✅
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  loginBox: {
    background: 'white',
    padding: '30px 40px',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    width: '95%',
    maxWidth: '1200px',
    textAlign: 'center',
    margin: '30px auto',
    animation: 'fadeIn 1s ease',
    fontFamily: 'Poppins, sans-serif'
  },
  heading: {
    marginBottom: '10px',
    color: '#4b0082'
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: '20px',
    color: '#888'
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  },
  card: {
    backgroundColor: '#fef9ff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'left',
    transition: 'transform 0.3s ease',
    color: '#2c004d'
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  eventName: {
    color: '#5b2a9d',
    marginBottom: '5px',
    fontSize: '1.3em'
  },
  text: {
    fontSize: '1em',
    marginBottom: '5px'
  },
  button: {
    backgroundColor: '#6a0dad',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    marginTop: '10px',
    width: '100%',
    cursor: 'pointer'
  }
};

export default Join;
