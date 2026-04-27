import { createContext, useReducer, useEffect, useState } from 'react';
import { cityReducer } from './CityReducer';

export const CityContext = createContext();

const API_URL = 'http://localhost:3001/api/cities';

export const CityProvider = ({ children }) => {
  const [cities, dispatch] = useReducer(cityReducer, []);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener los datos');
      const data = await response.json();
      
      dispatch({ type: 'SET_CITIES', payload: data });
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
      if (response.ok) {
        const addedCity = await response.json();
        dispatch({ type: 'ADD_CITY', payload: addedCity });
      }
    } catch (err) {
      console.error("Error creando ciudad", err);
    }
  };

  const deleteCity = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        dispatch({ type: 'DELETE_CITY', payload: id });
      }
    } catch (err) {
      console.error("Error eliminando", err);
    }
  };

  return (
    <CityContext.Provider value={{ 
      cities, 
      loading, 
      error, 
      addCity, 
      deleteCity 
    }}>
      {children}
    </CityContext.Provider>
  );
};