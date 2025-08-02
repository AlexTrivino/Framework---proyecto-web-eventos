import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const encontrado = usuarios.find(
      (u) =>
        (u.username === form.usuario || u.email === form.usuario) &&
        u.password === form.contrasena
    );

    if (encontrado) {
      localStorage.setItem('usuarioActivo', JSON.stringify(encontrado));

      navigate('/Index');
    } else {
      setError('Usuario o Contraseña Incorrecto');
    }
  };

  return (
    <div className="body-login">
      <div className="contenedor">
        <h2>Iniciar Sesión</h2>
        <form id="formLogin" onSubmit={handleSubmit}>
          <label className='label-login' htmlFor="usuario">Nombre de usuario o correo</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
          />

          <label className='label-login' htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={form.contrasena}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Entrar" />
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </form>

        <div className="registro-link">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
