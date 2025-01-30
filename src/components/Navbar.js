import React from 'react';
import './Navbar.css';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
               
        <a href="#home" style={{
            marginLeft: "5px",
        }}>Glassyfy</a>
      </div>
      {/* <ul className="navbar-links">
        <li><a href="#status">Device Status</a></li>
        <li><a href="#control">Control</a></li>
        <li><a href="#events">Events Log</a></li>
      </ul> */}
      <button className="navbar-btn" onClick={onLogout} style={{
            marginRight: "5px",
        }}>Logout</button>
    </nav>
  );
}

export default Navbar;
