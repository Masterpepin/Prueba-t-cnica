import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/Logo_azul_y_negro.png';
import api from './api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/token/', {
        username,
        password,
      });

      localStorage.setItem('jwt', response.data.token);
      window.location.href = '/home';
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error en la autenticación');
      } else {
        setError('Error en la autenticación');
      }
      console.error('Error durante la autenticación:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="iconuser"></div>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" disabled={loading}>Login</button>
          {loading && <div className="loader"></div>}
          {error && <p3 className="error-message">{error}</p3>}
        </form>
        <div className="links-container">
          <a href="/forgot-password">Olvidé mi contraseña</a>
          <a href="/register">Registrarme</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
