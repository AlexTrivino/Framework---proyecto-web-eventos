import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Login from './pages/login';
import Index from './pages/index';
import CrearEvento from './pages/crearEvento';
import RegistrarseEventos from './pages/registrarseEventos';

function App() {
  return (
    <div>
      <h1>Mi App de Eventos</h1>
    </div>
  );
}

export default App;

