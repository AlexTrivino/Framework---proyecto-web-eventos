import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login.jsx';
import Registro from './pages/registro.jsx';
import Index from './pages/index.jsx';
import CrearEvento from './pages/crearEvento.jsx';
import RegistroProveedor from './pages/registroProveedor.jsx';
import RegistrarseEventos from './pages/registrarseEventos.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/index" element={<Index />} />
        <Route path="/crearEvento" element={<CrearEvento />} />
        <Route path="/registroProveedor" element={<RegistroProveedor />} />
        <Route path="/registrarseEventos" element={<RegistrarseEventos />} />
      </Routes>
    </Router>
  );
}

export default App;

