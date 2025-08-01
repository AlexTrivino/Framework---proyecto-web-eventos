import React, { useState } from 'react';
import logo from '../assets/img/logo.png';
import '../styles/registroProveedor.css';

function RegistroProveedor() {
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    correo: '',
    telefono: '',
    categoria: '',
    descripcion: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono' && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, contacto, correo, telefono, categoria, descripcion } = formData;

    if (!nombre || !contacto || !correo || !telefono || !categoria || !descripcion) {
      setMensaje('Por favor, complete todos los campos.');
      setColorMensaje('red');
      return;
    }

    if (!/^\d{7,10}$/.test(telefono)) {
      setMensaje('Ingrese un número de teléfono válido (solo números, de 10 dígitos).');
      setColorMensaje('red');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setMensaje('Ingrese un correo electrónico válido.');
      setColorMensaje('red');
      return;
    }

    setMensaje('¡Formulario enviado correctamente!');
    setColorMensaje('green');
    setFormData({
      nombre: '',
      contacto: '',
      correo: '',
      telefono: '',
      categoria: '',
      descripcion: ''
    });
  };

  return (
    <div style={{ backgroundColor: '#EEF2E3', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="proveedor-container" style={{ flex: '1' }}>
        <img src={logo} alt="Logo" width="150px" />
        <h1>Registro de Proveedores</h1>
        <form onSubmit={handleSubmit}>
          <label>Nombre de la empresa o proveedor:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Nombre de contacto:</label>
          <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} required />

          <label>Correo electrónico:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required />

          <label>Teléfono:</label>
          <input type="tel" name="telefono" value={formData.telefono} maxLength="10" onChange={handleChange} required />

          <label>Categoría del servicio:</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="Catering">Catering</option>
            <option value="Logística">Logística</option>
            <option value="Decoración">Decoración</option>
            <option value="Audio y Video">Audio y Video</option>
            <option value="Otros">Otros</option>
          </select>

          <label>Descripción del servicio:</label>
          <textarea name="descripcion" rows="4" value={formData.descripcion} onChange={handleChange} required></textarea>

          <button type="submit">Enviar</button>
          <button type="button" onClick={() => window.location.href = '/index'}>Volver</button>
        </form>
        <p id="mensaje" style={{ color: colorMensaje }}>{mensaje}</p>
      </div>

      <footer style={{ backgroundColor: '#B0C9A8', textAlign: 'center', padding: '20px', color: 'black', fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
        &copy; 2025 UniEventos | Todos los derechos reservados
      </footer>
    </div>
  );
}

export default RegistroProveedor;
