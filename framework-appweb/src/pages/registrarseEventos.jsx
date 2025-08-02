import React, { useState, useEffect } from 'react';
import '../styles/registrarseEventos.css';
import logo from '../assets/img/logo.png';
import concierto from "../assets/img/concierto.jpg";
import congreso from "../assets/img/congreso.jpg";
import feria from "../assets/img/feria.jpg";
import exposicion from "../assets/img/exposicion.jpg";
import otro from "../assets/img/otro.jpg";

const imagenesMap = {
  "concierto.jpg": concierto,
  "congreso.jpg": congreso,
  "feria.jpg": feria,
  "exposición.jpg": exposicion,
  "otro.jpg": otro
};

function RegistrarseEventos() {
  const [eventos, setEventos] = useState([]);
  const [botonActivo, setBotonActivo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventosRegistrados, setEventosRegistrados] = useState([]);

  // Cargar eventos y registros previos
  useEffect(() => {
    const eventosGuardados = JSON.parse(localStorage.getItem('eventos')) || [];
    const registradosGuardados = JSON.parse(localStorage.getItem('eventosRegistrados')) || [];

    setEventos(eventosGuardados);
    setEventosRegistrados(registradosGuardados);
  }, []);

  const handleClick = (id) => {
    setBotonActivo(id);
    setModalVisible(true);
  };

  const confirmarRegistro = () => {
    if (botonActivo !== null) {
      const nuevosRegistrados = [...eventosRegistrados, botonActivo];
      setEventosRegistrados(nuevosRegistrados);
      localStorage.setItem('eventosRegistrados', JSON.stringify(nuevosRegistrados));
    }
    setModalVisible(false);
  };

  return (
    <div className="registrarse-eventos-page">
      <header>
        <img src={logo} alt="Logo" />
        <p>Conectando organizadores, asistentes y proveedores en un solo lugar</p>
      </header>
      <h1>Registrarse a un Evento</h1>
      <section className="registro-eventos">
        <div className="galeria-eventos">
          {eventos.length > 0 ? (
            eventos.map(evento => {
              const estaRegistrado = eventosRegistrados.includes(evento.id);
              return (
                <div className="evento-card" key={evento.id}>
                  <img src={imagenesMap[evento.imagen] || evento.imagen} alt={evento.titulo} />
                  <h3>{evento.titulo}</h3>
                  <p>📍 {evento.lugar}</p>
                  <p>📅 {evento.fecha} ⏰ {evento.hora}</p>
                  <p>👤 Organizado por: {evento.organizador}</p>
                  <button
                    id={`btn-${evento.id}`}
                    className="btn-registrarse"
                    onClick={() => handleClick(evento.id)}
                    disabled={estaRegistrado}
                    style={estaRegistrado ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
                  >
                    {estaRegistrado ? 'Registrado' : 'Registrarse'}
                  </button>
                </div>
              );
            })
          ) : (
            <p>No hay eventos disponibles para registrarse.</p>
          )}
        </div>

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>¿Seguro que desea registrarse en ese evento?</p>
              <div className="modal-buttons">
                <button id="confirmar" onClick={confirmarRegistro}>Sí</button>
                <button id="cancelar" onClick={() => setModalVisible(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer>
        &copy; 2025 UniEventos | Todos los derechos reservados
      </footer>
    </div>
  );
}

export default RegistrarseEventos;
