// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="main-nav">
    <ul>
      <li><Link to="/create">CREATE</Link></li>
      <li><Link to="/join">JOIN</Link></li>
      <li><Link to="/login">LOGIN</Link></li>
      <li><Link to="/register">REGISTER</Link></li>
      <li><Link to="/dashboard">DASHBOARD</Link></li>
    </ul>
  </nav>
);

export default Navbar;
