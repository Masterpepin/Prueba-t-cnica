import React, { useEffect, useState } from 'react';
import api from './api';

const ProtectedPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <p>Hola, {userData.username}!</p>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  );
};

export default ProtectedPage;