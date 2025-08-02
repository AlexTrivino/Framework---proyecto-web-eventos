import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import '../styles/crearEvento.css';

import conciertoImg from '../assets/img/concierto.jpg';
import congresoImg from '../assets/img/congreso.jpg';
import feriaImg from '../assets/img/feria.jpg';
import exposicionImg from '../assets/img/exposicion.jpg';
import otroImg from '../assets/img/otro.jpg';

const CrearEvento = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const imagenesPorTipo = {
    Concierto: conciertoImg,
    Congreso: congresoImg,
    Feria: feriaImg,
    Exposición: exposicionImg,
    Otro: otroImg
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const datos = {
      id: Date.now(),
      titulo: form.titulo.value.trim(),
      fecha: form.fecha.value,
      hora: form.hora.value,
      lugar: form.lugar.value.trim(),
      tipo: form.tipo.value,
      descripcion: form.descripcion.value.trim(),
      organizador: form.organizador.value.trim(),
      imagen: imagenesPorTipo[form.tipo.value] ? `${form.tipo.value.toLowerCase()}.jpg`: "otro.jpg",
    };

    const camposVacios = Object.values(datos).some((v) => !v);
    if (camposVacios) {
      setMensaje('Por favor, complete todos los campos.');
      return;
    }

    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.push(datos);

    localStorage.setItem('eventos', JSON.stringify(eventos));

    setMensaje('¡Evento creado exitosamente!');
    form.reset();
  };

  return (
    <div className="crear-evento-page">
      <div className="container">
        <img src={logo} width="150px" alt="Logo" />
        <h1>Crear un Evento</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titulo">Título del evento:</label>
          <input type="text" id="titulo" name="titulo" required />

          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" name="fecha" required />

          <label htmlFor="hora">Hora:</label>
          <input type="time" id="hora" name="hora" required />

          <label htmlFor="lugar">Lugar:</label>
          <input type="text" id="lugar" name="lugar" required />

          <label htmlFor="tipo">Tipo de evento:</label>
          <select id="tipo" name="tipo" required>
            <option value="">Seleccione una opción</option>
            <option value="Concierto">Concierto</option>
            <option value="Congreso">Congreso</option>
            <option value="Feria">Feria</option>
            <option value="Exposición">Exposición</option>
            <option value="Otro">Otro</option>
          </select>

          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" rows="4" required></textarea>

          <label htmlFor="organizador">Nombre del organizador:</label>
          <input type="text" id="organizador" name="organizador" required />

          <button type="submit">Crear Evento</button>
          <button type="button" onClick={() => navigate('/index')}>
            Volver
          </button>
        </form>
        <p id="mensaje">{mensaje}</p>
      </div>

      <footer>
        &copy; 2025 UniEventos | Todos los derechos reservados
      </footer>
    </div>
  );
};

export default CrearEvento;
