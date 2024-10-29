// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional: for styling

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <Link to="/photos" className="home-button">Home</Link>
      </nav>
      <h1><Link to="/">Photo Gallery</Link></h1>
    </header>
  );
};

export default Header;
