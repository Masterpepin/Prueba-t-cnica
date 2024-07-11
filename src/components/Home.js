import React, { useEffect, useState } from 'react';
import api from './api';
import './Home.css';
import Sidebar from './Sidebar';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await api.get('/plantillas/getData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        setError('Error al obtener los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(order =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('jwt');
      await api.put(`/plantillas/changeStatus?IDpedido=${orderId}&status=${newStatus}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      setError('Error al cambiar el estado del pedido');
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <div className="search-container">
          <div className="header">Pedidos</div>
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon"></div>
          </div>
          <div className="button-container">
            <button className="button button-filtro">
              <div className="button-icon"></div>
              Filtro
            </button>
            <button className="button button-vista">
              <div className="button-icon"></div>
              Vista
            </button>
          </div>
        </div>
        <div className="alerts-container">
          <div className="alert alert1">
            <div className="alert-icon"></div>
            Pedidos
          </div>
          <div className="alert alert2">
            <div className="alert-icon"></div>
            En proceso
          </div>
          <div className="alert alert3">
            <div className="alert-icon"></div>
            Rechazado
          </div>
          <div className="alert alert4">
            <div className="alert-icon"></div>
            Listo
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p className="error-message">{error}</p>}
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Fecha</th>
                  <th>Status</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className={order.status === 'Pending' ? 'order-pending' : ''}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>
                      <button onClick={() => handleStatusChange(order.id, 'Completed')}>Marcar como completado</button>
                      <button onClick={() => handleStatusChange(order.id, 'Cancelled')}>Cancelar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
