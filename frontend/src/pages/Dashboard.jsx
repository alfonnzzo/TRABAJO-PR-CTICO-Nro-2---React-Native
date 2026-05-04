import { useState, useEffect, useContext, useMemo } from 'react';
import CityForm from '../components/CityForm';
import WeatherDash from '../components/WeatherDash';
import { CityContext } from '../context/CityContext';

export default function Dashboard() {
  const { cities, loading, error } = useContext(CityContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = '#0f0e17';
    document.body.style.margin = '0';
  }, []);

  // useMemo: Cálculo costoso / Estabilidad referencial.
  // Solo recalcula el filtro si cambia la lista de ciudades o el término de búsqueda.
  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      const nombreCiudad = city.name || city.nombre || '';
      return nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [cities, searchTerm]);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ color: '#fffffe', textAlign: 'center', marginBottom: '40px', fontSize: '36px' }}>
        WeatherDash
      </h1>
      
      <CityForm />

      <div style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Buscar ciudad en tu panel..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          /* ... mismos estilos ... */
        />
      </div>

      {loading && <p style={{ color: '#94a1b2', textAlign: 'center' }}>Cargando tus ciudades...</p>}
      {error && <p style={{ color: '#ef4565', textAlign: 'center' }}>Error de conexión: {error}</p>}
      {!loading && !error && filteredCities.length === 0 && (
        <p style={{ color: '#94a1b2', textAlign: 'center' }}>No hay ciudades en tu panel. Agregá una arriba.</p>
      )}

      {/* Ahora le pasamos un array con referencia estable */}
      <WeatherDash ciudadesDesdeApp={filteredCities} />
    </div>
  );
}