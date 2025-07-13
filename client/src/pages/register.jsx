import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [escenarioDeportivo, setEscenarioDeportivo] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const validarCampos = () => {
    const nuevosErrores = {};
    // Nombre: solo letras y espacios, mínimo 3 caracteres
    if (!/^([A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,})$/.test(nombre.trim())) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 letras y solo puede contener letras y espacios.';
    }
    // Correo: formato válido
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      nuevosErrores.correo = 'Dominio de correo no válido.';
    }
    // Contraseña: mínimo 8 caracteres, mayúscula, minúscula, número y especial
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(contraseña)) {
      nuevosErrores.contraseña = 'Debe tener 8+ caracteres, mayúscula, minúscula, número y símbolo.';
    }
    // Teléfono: solo números, mínimo 7 dígitos
    if (telefono && !/^\d{10,}$/.test(telefono)) {
      nuevosErrores.telefono = 'El teléfono debe tener al menos 10 dígitos y solo números.';
    }
    // Edad: entre 10 y 100
    if (!edad || isNaN(edad) || edad < 10 || edad > 100) {
      nuevosErrores.edad = 'La edad debe estar entre 10 y 100 años.';
    }
    // Género y escenario: requeridos
    if (!genero) {
      nuevosErrores.genero = 'Selecciona un género.';
    }
    if (!escenarioDeportivo) {
      nuevosErrores.escenarioDeportivo = 'Selecciona un escenario deportivo favorito.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    if (!validarCampos()) return;
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        nombre,
        correo,
        contraseña,
        telefono,
        edad,
        genero,
        escenarioDeportivo
      });
      setNombre('');
      setCorreo('');
      setContraseña('');
      setTelefono('');
      setEdad('');
      setGenero('');
      setEscenarioDeportivo('');
      setErrores({});
      // Forzar limpieza inmediata de correo y contraseña en el DOM
      document.querySelector('input[type="email"]').value = '';
      document.querySelector('input[type="password"]').value = '';
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setErrores({ general: err.response?.data?.msg || 'Error al registrar usuario.' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4f8cff 0%, #6ee7b7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: 18, background: 'rgba(255,255,255,0.97)' }}>
        <div className="text-center mb-4">
          <img src={require('../assets/deporte.png')} alt="Deporte" style={{ width: 70, marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px #4f8cff33' }} />
          <h3 className="mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>Crear Cuenta</h3>
          <p className="text-muted mb-0" style={{ fontSize: 15 }}>Regístrate para reservar escenarios deportivos</p>
        </div>
        <form onSubmit={handleSubmit}>
          {errores.general && <div className="alert alert-danger" style={{ borderRadius: 8, fontWeight: 500 }}>{errores.general}</div>}
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Nombre completo</label>
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            {errores.nombre && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.nombre}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Correo</label>
            <input
              type="email"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            {errores.correo && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.correo}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Contraseña</label>
            <input
              type="password"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            {errores.contraseña && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.contraseña}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Teléfono</label>
            <input
              type="text"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            {errores.telefono && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.telefono}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Edad</label>
            <input
              type="number"
              className="form-control"
              style={{ borderRadius: 8, borderColor: '#4f8cff' }}
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              min="10"
              max="100"
            />
            {errores.edad && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.edad}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Género</label>
            <select className="form-select" style={{ borderRadius: 8, borderColor: '#4f8cff' }} value={genero} onChange={e => setGenero(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            {errores.genero && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.genero}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 500 }}>Escenario deportivo favorito</label>
            <select className="form-select" style={{ borderRadius: 8, borderColor: '#4f8cff' }} value={escenarioDeportivo} onChange={e => setEscenarioDeportivo(e.target.value)} required>
              <option value="">Selecciona un escenario</option>
              <option value="cancha futbol">Cancha de Fútbol</option>
              <option value="cancha baloncesto">Cancha de Baloncesto</option>
              <option value="cancha tenis">Cancha de Tenis</option>
              <option value="piscina">Piscina</option>
              <option value="gimnasio">Gimnasio</option>
              <option value="otro">Otro</option>
            </select>
            {errores.escenarioDeportivo && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 2 }}>{errores.escenarioDeportivo}</div>}
          </div>
          <button type="submit" className="btn btn-success w-100" style={{ borderRadius: 8, fontWeight: 600, background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)', border: 'none' }}>Registrarse</button>
        </form>
        <div className="mt-3 text-center">
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
