import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const username = localStorage.getItem('username'); 

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="sidebar">
        <div className="sidebar-image"></div> 
        <div className="sidebar-top">
        </div>
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/home" className="nav-link">
              <div className="nav-icon"></div>
              Pedidos
            </Link>
          </li>
        </ul>
        <div className="profile-info">
        <div className="user-icon"></div> 
        <span className="username">{username}</span> 
      </div>
        <div className="logout-section">
          <a href="#!" onClick={handleLogout} className="logout-link">
            <div className="logout-icon"></div> 
            Cerrar sesión
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
