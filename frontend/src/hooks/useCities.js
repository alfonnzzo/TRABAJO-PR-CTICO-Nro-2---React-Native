import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3001/api/cities';

export const useCities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener los datos');
      const data = await response.json();
      setCities(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const addCity = async (newCity) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity)
      });
      if (response.ok) fetchCities();
    } catch (err) {
      console.error("Error creando ciudad", err);
    }
  };

  const deleteCity = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) fetchCities();
    } catch (err) {
      console.error("Error eliminando", err);
    }
  };

  return { cities, loading, error, addCity, deleteCity };
};