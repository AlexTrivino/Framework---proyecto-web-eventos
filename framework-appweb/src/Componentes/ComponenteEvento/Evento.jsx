import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import EventoCard from './Card';
import Modal from './Modal';
import './Evento.css'

const eventos = [
  {
    titulo: "Concierto Tsachilazo",
    lugar: "Parque Helen Tenka SD.",
    fecha: "10 de julio, 2025",
    entrada: "Entrada libre",
    imagen: "/conciertp.jpg"
  },
  {
    titulo: "Expo Emprende Estudiantil",
    lugar: "Centro de Convenciones",
    fecha: "18 de julio, 2025",
    entrada: "Entrada libre",
    imagen: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=80"
  },
  // ... agrega los demás eventos
];

export default function RegistroEventos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const handleRegistro = (evento) => {
    setEventoSeleccionado(evento);
    setModalVisible(true);
  };

  const confirmarRegistro = () => {
    if (eventoSeleccionado) {
      eventoSeleccionado.registrado = true;
    }
    setModalVisible(false);
  };

  return (
    <>
      <Header />
      <h1>Registrarse a un Evento</h1>
      <section className="registro-eventos">
        <div className="galeria-eventos">
          {eventos.map((evento, index) => (
            <EventoCard
              key={index}
              evento={evento}
              onRegistrar={() => handleRegistro(evento)}
              registrado={evento.registrado}
            />
          ))}
        </div>
        {modalVisible && (
          <Modal
            onConfirmar={confirmarRegistro}
            onCancelar={() => setModalVisible(false)}
          />
        )}
      </section>
      <Footer />
    </>
  );
}
