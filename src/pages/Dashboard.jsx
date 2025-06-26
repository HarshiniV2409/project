// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style.css';
import targetLogo from '../assets/target.png';
import backgroundImage from '../assets/BACKGROUND.jpg';
import user from '../assets/default-user.jpg';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="logo">
        <img src={targetLogo} alt="Elite Events Logo" />
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.8em' }}>ELITE EVENTS</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/create">CREATE EVENT</Link></li>
          <li><Link to="/join">JOIN EVENT</Link></li>
          <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1em' }}>LOGOUT</button></li>
        </ul>
      </nav>
    </header>
  );
};

const Dashboard = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) navigate('/login');
    setUser(loggedInUser);
    const allCreated = JSON.parse(localStorage.getItem('createdEvents')) || [];
    const allJoined = JSON.parse(localStorage.getItem('joinedEvents')) || [];
    setCreatedEvents(allCreated.filter(e => e.user === loggedInUser.email));
    setJoinedEvents(allJoined.filter(e => e.user === loggedInUser.email));
  }, [navigate]);

  const handleDelete = (eventName) => {
    const updated = createdEvents.filter(e => e.name !== eventName);
    setCreatedEvents(updated);
    const allEvents = JSON.parse(localStorage.getItem('createdEvents')) || [];
    const filtered = allEvents.filter(e => e.name !== eventName || e.user !== user.email);
    localStorage.setItem('createdEvents', JSON.stringify(filtered));
  };

  const handleUnjoin = (eventName) => {
    const updated = joinedEvents.filter(e => e.name !== eventName);
    setJoinedEvents(updated);
    const allEvents = JSON.parse(localStorage.getItem('joinedEvents')) || [];
    const filtered = allEvents.filter(e => e.name !== eventName || e.user !== user.email);
    localStorage.setItem('joinedEvents', JSON.stringify(filtered));
  };

  return (
    <>
      <Navbar />
      <div
        className="dashboard-container"
        style={{
          padding: '30px',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          fontFamily: 'Poppins, sans-serif',
          backdropFilter: 'blur(4px)',
          color: '#fff'
        }}
      >
        <h2 style={{ color: '#ffd700', textAlign: 'center', fontSize: '2.2em' }}>📋 Dashboard</h2>

        {user && (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
           <h1> WELCOME TO ELITE EVENTS!!</h1>
            <h3 style={{ marginTop: '15px', fontSize: '1.7em' }}>{user.name}</h3>
            <p style={{ fontSize: '1.1em' }}>{user.email}</p>
          </div>
        )}

        <div>
          <h3 style={{ color: '#ffd700', marginTop: '20px', fontSize: '2em' }}>Events You Created</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {createdEvents.map((event, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#2c004d', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <h4 style={{ fontSize: '1.4em' }}>{event.name}</h4>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <button onClick={() => handleDelete(event.name)} style={{ background: '#e63946', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ color: '#ffd700', marginTop: '40px', fontSize: '2em' }}>Events You Joined</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {joinedEvents.map((event, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#2c004d', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <h4 style={{ fontSize: '1.4em' }}>{event.name}</h4>
                <p><strong>Type:</strong> {event.type}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <button onClick={() => handleUnjoin(event.name)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>Unjoin</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;