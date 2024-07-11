import React, { useEffect, useState } from 'react';
import api from './api';
import './Home.css';
import Sidebar from './Sidebar'; 

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) throw new Error('No hay token de autenticación');

        const response = await api.get('/plantillas/getData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Error al obtener los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error('No hay token de autenticación');

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
      <Sidebar /> {/* Agrega el Sidebar */}
      <div className="main-content">
        <div className="card-container">
          <div className="card">
            <h3>Total de Pedidos</h3>
            <p>{orders.length}</p>
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
                {orders.map(order => (
                  <tr key={order.id} className={order.status.toLowerCase()}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.date}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="En espera">En espera</option>
                        <option value="Completado">Completado</option>
                        <option value="Rechazado">Rechazado</option>
                      </select>
                    </td>
                    <td>Acciones</td>
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
