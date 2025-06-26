import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style.css';
import targetLogo from '../assets/target.png';

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

const Create = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "Crafting Unforgettable Experiences",
    "Celebrate Every Moment",
    "Turning Moments into Memories",
    "Your Vision, Our Mission"
  ];

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    details: '',
    phone: '',
    date: '',
    time: '',
    venue: ''
  });

  const eventTypes = [
    'Weddings',
    'Birthdays',
    'Concerts',
    'College Fests',
    'Happy Streets',
    'Conferences'
  ];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert('Please login to create an event.');
      navigate('/login');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const eventData = {
    user: user.email,
    name: formData.name,
    type: formData.type,
    details: formData.details,
    phone: formData.phone,
    date: formData.date,
    time: formData.time,
    venue: formData.venue
  };

  try {
    const response = await fetch("https://pro-backend-m2v3.onrender.com/api/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
    });

    const result = await response.json();

    if (response.ok) {
      alert("🎉 Thanks for creating the event! Our team will contact you for further details.");
      navigate("/dashboard");
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Create error:", error);
    alert("❌ Something went wrong while creating the event!");
  }
};


  return (
    <>
      <Navbar />
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>🛠 Create an Event</h2>
        <div style={styles.quote}>{quotes[quoteIndex]}</div>

        <form onSubmit={handleSubmit} style={styles.formGrid}>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <textarea
            name="details"
            placeholder="Event Details"
            value={formData.details}
            onChange={handleChange}
            required
            style={{ ...styles.input, gridColumn: 'span 2', height: '80px' }}
          ></textarea>

          <input
            type="text"
            name="phone"
            placeholder="Contact Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="venue"
            placeholder="Event Venue"
            value={formData.venue}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={{ ...styles.button, gridColumn: 'span 2' }}>
            Create Event 🎉
          </button>
        </form>
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
    width: '90%',
    maxWidth: '600px',
    textAlign: 'center',
    margin: '30px auto',
    fontFamily: 'Poppins, sans-serif'
  },
  heading: {
    marginBottom: '10px',
    color: '#4b0082'
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: '20px',
    color: '#555'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#6a0dad',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  }
};

export default Create;
