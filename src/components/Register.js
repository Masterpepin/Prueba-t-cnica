import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../assets/Logo_azul_y_negro.png';
import api from './api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
  
    try {
      const response = await api.post('/register', {
        username: name,
        email,
        password,
      });
  
      console.log('Registro exitoso:', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Detalles del error:', error.response);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error en el registro');
      } else {
        setError('Error en el registro');
      }
      console.error('Error durante el registro:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="iconuser"></div>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <div className="iconuser"></div>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <div className="iconlock"></div>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <div className="iconlock"></div>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Repetir Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" disabled={loading}>Registrarse</button>
          {loading && <div className="loader"></div>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
