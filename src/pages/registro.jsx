import React, { useState } from 'react';
import '../styles/registro.css';
import logo from '../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    condiciones: false,
  });

  const [errores, setErrores] = useState({});
  const [feedback, setFeedback] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ width: '0%', color: 'red', text: 'Muy débil' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    
    if (!form.username.trim()) {
      nuevosErrores.username = 'El nombre de usuario es obligatorio';
      setFeedback('');
    } else if (form.username.length < 4) {
      nuevosErrores.username = 'Mínimo 4 caracteres';
      setFeedback('Mínimo 4 caracteres');
    } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
      nuevosErrores.username = 'Solo letras, números y guiones bajos';
      setFeedback('Solo letras, números y guiones bajos');
    } else {
      setFeedback('Nombre de usuario válido');
    }

    if (!form.email.trim()) {
      nuevosErrores.email = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nuevosErrores.email = 'Email inválido';
    }

    if (!form.password) {
      nuevosErrores.password = 'La contraseña es obligatoria';
    }

    if (!form.confirmPassword) {
      nuevosErrores.confirmPassword = 'Confirmar contraseña es obligatorio';
    } else if (form.password !== form.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!form.condiciones) {
      nuevosErrores.condiciones = 'Debes aceptar las condiciones';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const evaluarFortaleza = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const colors = ['red', 'orange', 'yellow', 'green'];
    const messages = ['Muy débil', 'Débil', 'Moderada', 'Fuerte'];

    setPasswordStrength({
      width: `${(strength / 4) * 100}%`,
      color: colors[strength - 1] || 'red',
      text: messages[strength - 1] || 'Muy débil',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  
        const existeUsuario = usuarios.some(
          (u) => u.email === form.email || u.username === form.username
        );

        if (existeUsuario) {
          alert("Ya existe un usuario con ese correo o nombre de usuario");
          return;
        }

        const nuevoUsuario = {
          nombre: form.nombre,
          username: form.username,
          email: form.email,
          password: form.password
        };

        localStorage.setItem("usuarios", JSON.stringify([...usuarios, nuevoUsuario]));

        alert('✅ Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login');

      setForm({
        nombre: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        condiciones: false,
      });
      setFeedback('');
      setPasswordStrength({ width: '0%', color: 'red', text: 'Muy débil' });
      setErrores({});
    }
  };

  return (
    <div className='contenedor-registro'>
      <form className="form-registro" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" width="150" />
        <h1>Registro</h1>
    
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
    
        <label htmlFor="username">Nombre de Usuario:</label>
        <input type="text" id="username" name="username" value={form.username} onChange={handleChange} />
        {errores.username && <span className="error">{errores.username}</span>}
        <span id="usernameFeedback" className={feedback.includes('válido') ? 'valido' : 'invalido'}>{feedback}</span>
    
        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
        {errores.email && <span className="error">{errores.email}</span>}
    
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={form.password} onChange={(e) => { handleChange(e); evaluarFortaleza(e.target.value); }} />
        <div id="strengthMeter">
          <div className="strength-bar" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}></div>
        </div>
        {errores.password && <span className="error">{errores.password}</span>}
        <span id="strengthText" style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
    
        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        {errores.confirmPassword && <span className="error">{errores.confirmPassword}</span>}
    
        <label>
          <input type="checkbox" id="condiciones" name="condiciones" checked={form.condiciones} onChange={handleChange} /> Acepto los términos y condiciones
        </label>
        {errores.condiciones && <span className="error">{errores.condiciones}</span>}
    
        <button className="button-registro" type="submit">Registrarse</button>
    
        <p>¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a></p>
      </form>
    </div>
  );
}

export default Registro;