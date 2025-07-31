import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/index.jsx';
import CrearEvento from './pages/crearEvento.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/index" element={<Index />} />
        <Route path="/crearEvento" element={<CrearEvento />} />
      </Routes>
    </Router>
  );
}

export default App;
