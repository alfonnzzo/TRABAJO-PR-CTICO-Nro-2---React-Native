import { useState, useEffect, useContext } from 'react';
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

  const filteredCities = cities.filter(city => {
    const nombreCiudad = city.name || city.nombre || '';
    return nombreCiudad.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
          style={{ 
            width: '100%', padding: '16px', backgroundColor: '#16161a', 
            border: '2px solid #242629', borderRadius: '12px', color: '#fffffe',
            fontSize: '16px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#7f5af0'}
          onBlur={(e) => e.target.style.borderColor = '#242629'}
        />
      </div>

      {loading && <p style={{ color: '#94a1b2', textAlign: 'center' }}>Cargando tus ciudades...</p>}
      {error && <p style={{ color: '#ef4565', textAlign: 'center' }}>Error de conexión: {error}</p>}
      {!loading && !error && filteredCities.length === 0 && (
        <p style={{ color: '#94a1b2', textAlign: 'center' }}>No hay ciudades en tu panel. Agregá una arriba.</p>
      )}

      <WeatherDash ciudadesDesdeApp={filteredCities} />
    </div>
  );
}