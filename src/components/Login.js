import React from 'react';
import './Login.css';
import logo from '../assets/Logo_azul_y_negro.png'; 

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" /> 
        <form>
          <div className="input-group">
            <div className="iconuser"></div>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Usuario" 
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
              required 
            />
          </div>
          <button type="submit">Iniciar Sesion</button>
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
