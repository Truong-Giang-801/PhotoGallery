// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';

function App() {
  return (
    <Router>
      <Header /> {/* Add Header here */}
      <Routes>
        <Route path="/" element={<Navigate to="/photos" />} />
        <Route path="/photos" element={<PhotoGrid />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
