import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Pedidos</h2>
      </div>
      <ul className="menu">
        <li>
          <NavLink to="/home" className="menu-item">
            <span>Ver Pedidos</span>
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </li>
      </ul>
      <div className="profile">
        <p>Perfil: Admin</p>
      </div>
    </div>
  );
};

export default Sidebar;
