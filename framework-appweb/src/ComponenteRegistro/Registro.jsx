import { useState } from 'react';
import InputField from './InputField';
import PasswordField from './PasswordField';
import Checkbox from './Checkbox';
import UsernameFeedback from './UsernameFeedback';
import './Registro.css'


export default function Registro() {
  const [form, setForm] = useState({
    nombre: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    condiciones: false
  });

  const [errors, setErrors] = useState({});
  const [usernameFeedback, setUsernameFeedback] = useState({ msg: '', valid: false });

  function handleChange(e) {
    const { id, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));

    if (id === 'username') validateUsername(value);
  }

  function validateUsername(username) {
    if (!username) {
      setErrors(prev => ({ ...prev, username: 'El nombre de usuario es obligatorio' }));
      setUsernameFeedback({ msg: '', valid: false });
      return;
    }
    if (username.length < 4) {
      setUsernameFeedback({ msg: 'Mínimo 4 caracteres', valid: false });
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameFeedback({ msg: 'Solo letras, números y guiones bajos', valid: false });
    } else {
      setUsernameFeedback({ msg: 'Nombre de usuario válido', valid: true });
      setErrors(prev => ({ ...prev, username: null }));
    }
  }

  function validate() {
    let valid = true;
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
      valid = false;
    }
    if (!form.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido';
      valid = false;
    }
    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es obligatorio';
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      valid = false;
    }
    if (!form.condiciones) {
      newErrors.condiciones = 'Debes aceptar las condiciones';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      alert('Formulario enviado correctamente');
      setForm({
        nombre: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        condiciones: false
      });
      setErrors({});
      setUsernameFeedback({ msg: '', valid: false });
    }
  }

  return (
    <form onSubmit={handleSubmit} id="registroForm">

      <img src="../Imagenes/1.png" width="150px" alt="Logo" />
      <h1>Registro</h1>

      <InputField
        id="nombre"
        label="Nombre:"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
        error={errors.nombre}
      />

      <InputField
        id="username"
        label="Nombre de Usuario:"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={handleChange}
        error={errors.username}
      />
      <UsernameFeedback feedback={usernameFeedback.msg} valid={usernameFeedback.valid} />

      <InputField
        id="email"
        label="Correo Electrónico:"
        type="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />

      <PasswordField
        id="password"
        label="Contraseña:"
        placeholder="Ingresa tu contraseña"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <InputField
        id="confirmPassword"
        label="Confirmar Contraseña:"
        type="password"
        placeholder="Confirmar Password"
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <Checkbox
        id="condiciones"
        label="Declaro haber leído y aceptar las condiciones generales del programa y la normativa sobre protección de datos."
        checked={form.condiciones}
        onChange={handleChange}
        error={errors.condiciones}
      />

      <button type="submit">Registrarse</button>

      <p>¿Ya tienes cuenta? <a href="../login/login.html">Inicia Sesión</a></p>

    </form>
  );
}
