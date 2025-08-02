import React, { useState, useEffect } from "react";
import "../styles/index.css";
import concierto from "../assets/img/concierto.jpg";
import congreso from "../assets/img/congreso.jpg";
import feria from "../assets/img/feria.jpg";
import exposicion from "../assets/img/exposicion.jpg";
import otro from "../assets/img/otro.jpg";
import logo from '../assets/img/logo.png';

const imagenesMap = {
  "concierto.jpg": concierto,
  "congreso.jpg": congreso,
  "feria.jpg": feria,
  "exposición.jpg": exposicion,
  "otro.jpg": otro
};

const Evento = ({ evento }) => {
  const [verMas, setVerMas] = useState(false);

  const toggleDescripcion = () => {
    setVerMas(!verMas);
  };

  return (
    <div className="evento">
      <div className="evento-content">
        <h3>{evento.titulo}</h3>
        <img src={imagenesMap[evento.imagen] || otro} alt={evento.titulo} />
        <p>📍 {evento.lugar}</p>
        <p>📅 {evento.fecha}</p>
        <p>🎫 Entrada libre</p>
        <button className="btn-ver-mas" onClick={toggleDescripcion}>
          {verMas ? "Ver menos" : "Ver más"}
        </button>
        {verMas && <div className="descripcion-extra">{evento.descripcion}</div>}
      </div>
    </div>
  );
};

const Index = () => {
  const [eventosDestacados, setEventosDestacados] = useState([]);
  const [gatoUrl, setGatoUrl] = useState("");

  const cargarGato = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((res) => res.json())
      .then((data) => {
        setGatoUrl(data[0].url);
      })
      .catch((err) => console.error("Error cargando el gato:", err));
  };

  useEffect(() => {
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || [];

    if (eventosGuardados.length > 0) {
      const eventosAleatorios = [...eventosGuardados]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setEventosDestacados(eventosAleatorios);
    }

    cargarGato(); 
  }, []);

  return (
    <>
      <header className="header-index">
        <img src={logo} alt="UniEventos logo" />
        <p>
          Conectando organizadores, asistentes y proveedores en un solo lugar
        </p>
      </header>

      <button className="close" onClick={() => (window.location.href = "/login")}>
        Cerrar sesión
      </button>

      <nav>
        <a href="/crearEvento">🎟️ Crear un Evento</a>
        <a href="/registrarseEventos">📅 Registrarse a un Evento</a>
        <a href="/registroProveedor">🤝 Registro de Proveedores</a>
      </nav>

      <section className="eventos">
        <h2>Eventos Destacados</h2>
        <div className="eventos-scroll">
          {eventosDestacados.length > 0 ? (
            eventosDestacados.map((evento) => (
              <Evento key={evento.id} evento={evento} />
            ))
          ) : (
            <p>No hay eventos disponibles por el momento.</p>
          )}
        </div>
      </section>

      {/* 🐱 Imagen del gatito en la esquina con botón */}
      {gatoUrl && (
        <div className="gatito-container">
          <img src={gatoUrl} alt="Gatito aleatorio" />
          <button onClick={cargarGato}>Cambiar 🐱</button>
        </div>
      )}

      <section className="descripcion">
        <h2>¿Qué es UniEventos?</h2>
        <p>
          UniEventos es un sistema diseñado para la organización, promoción y
          participación en eventos de todo tipo. El objetivo principal de este
          sistema es conectar a personas que desean asistir a eventos con
          quienes los organizan, inovando y creando así una comunidad activa y
          dinámica en lo que respecta al mundo de los eventos. Los usuarios
          podrán registrase para participar en eventos de su interés, explorando
          diferentes categorías y descubriendo nuevas experiencias.
        </p>
      </section>

      <footer className='footer-index'>
        &copy; 2025 UniEventos | Todos los derechos reservados
      </footer>
    </>
  );
};

export default Index;
