export default function EventoCard({ evento, onRegistrar, registrado }) {
  return (
    <div className="evento-card">
      <img src={evento.imagen} alt={evento.titulo} />
      <h3>{evento.titulo}</h3>
      <p>📍 {evento.lugar}</p>
      <p>📅 {evento.fecha}</p>
      <p>🎫 {evento.entrada}</p>
      <button
        className="btn-registrarse"
        onClick={onRegistrar}
        disabled={registrado}
        style={{
          backgroundColor: registrado ? '#ccc' : '',
          cursor: registrado ? 'not-allowed' : 'pointer'
        }}
      >
        {registrado ? 'Registrado' : 'Registrarse'}
      </button>
    </div>
  );
}
