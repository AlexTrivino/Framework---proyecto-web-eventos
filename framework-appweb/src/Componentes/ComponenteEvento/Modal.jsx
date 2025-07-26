export default function Modal({ onConfirmar, onCancelar }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>¿Seguro que desea registrarse en ese evento?</p>
        <div className="modal-buttons">
          <button onClick={onConfirmar}>Sí</button>
          <button onClick={onCancelar}>No</button>
        </div>
      </div>
    </div>
  );
}
