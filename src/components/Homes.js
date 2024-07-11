import React, { useEffect, useState } from 'react';
import api from './api';
import './Home.css'; 

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('jwt');
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

  const handleChangeStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('jwt');
    try {
      await api.put(`/plantillas/changeStatus`, null, {
        params: {
          IDpedido: orderId,
          status: newStatus,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      setError('Error al cambiar el estado del pedido');
    }
  };

  return (
    <div className="home-container">
      <h1>Pedidos</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={`status-${order.status.toLowerCase()}`}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.date}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                  >
                    <option value="En espera">En espera</option>
                    <option value="Completado">Completado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
