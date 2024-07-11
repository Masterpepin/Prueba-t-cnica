import React, { useEffect, useState } from 'react';
import { obtenerDatos } from '../api';
import Table from './Table';

const DatosComponent = () => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await obtenerDatos();
        setDatos(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDatos();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {datos ? (
        <Table data={datos} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default DatosComponent;
