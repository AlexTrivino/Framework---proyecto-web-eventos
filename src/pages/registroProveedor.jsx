import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import '../styles/registroProveedor.css';

function RegistroProveedor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    correo: '',
    telefono: '',
    categoria: '',
    descripcion: ''
  });

  const [proveedores, setProveedores] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('');

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('proveedores')) || [];
    setProveedores(datosGuardados);
  }, []);

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
      setMensaje('Ingrese un número de teléfono válido (7 a 10 dígitos).');
      setColorMensaje('red');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setMensaje('Ingrese un correo electrónico válido.');
      setColorMensaje('red');
      return;
    }

    const nuevoProveedor = {
      id: Date.now(),
      nombre,
      contacto,
      correo,
      telefono,
      categoria,
      descripcion
    };

    const listaActualizada = [...proveedores, nuevoProveedor];
    setProveedores(listaActualizada);
    localStorage.setItem('proveedores', JSON.stringify(listaActualizada));

    setMensaje('¡Proveedor registrado correctamente!');
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

  const eliminarProveedor = (id) => {
    const listaFiltrada = proveedores.filter(p => p.id !== id);
    setProveedores(listaFiltrada);
    localStorage.setItem('proveedores', JSON.stringify(listaFiltrada));
  };

  return (
    <div className="proveedor-page">
      <div className="proveedor-layout">
        {/* FORMULARIO */}
        <div className="proveedor-container">
          <img src={logo} alt="Logo" width="120px" />
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
            <button type="button" onClick={() => navigate('/index')}>Volver</button>
          </form>
          <p id="mensaje" style={{ color: colorMensaje }}>{mensaje}</p>
        </div>

        {/* LISTA */}
        <div className="proveedor-lista">
          <h2>Proveedores Registrados</h2>
          {proveedores.length > 0 ? (
            proveedores.map(prov => (
              <div key={prov.id} className="proveedor-card">
                <h4>{prov.nombre}</h4>
                <p><strong>Contacto:</strong> {prov.contacto}</p>
                <p><strong>Tel:</strong> {prov.telefono}</p>
                <p><strong>Categoría:</strong> {prov.categoria}</p>
                <button onClick={() => eliminarProveedor(prov.id)}>Eliminar</button>
              </div>
            ))
          ) : (
            <p className="no-proveedores">No hay proveedores registrados.</p>
          )}
        </div>
      </div>

      <footer className="footer-proveedor">
        &copy; 2025 UniEventos | Todos los derechos reservados
      </footer>
    </div>
  );
}

export default RegistroProveedor;
