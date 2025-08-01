import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Login from './components/Login';
import Index from './components/Index';
import CrearEvento from './components/CrearEvento';
import RegistrarseEventos from './components/RegistrarseEventos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<Index />} />
        <Route path="/crearEvento" element={<CrearEvento />} />
        <Route path="/registrarseEventos" element={<RegistrarseEventos />} />
      </Routes>
    </Router>
  );
}

export default App;

