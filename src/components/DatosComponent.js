import React, { useEffect, useState } from 'react';
import { obtenerDatos } from '../api';

const DatosComponent = () => {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await obtenerDatos();
        setDatos(data);
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
        <pre>{JSON.stringify(datos, null, 2)}</pre>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default DatosComponent;
