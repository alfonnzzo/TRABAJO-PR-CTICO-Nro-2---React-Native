import { useState } from 'react';

const CityForm = ({ onAddCity }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('⚠️ El nombre de la ciudad es obligatorio');
      return;
    }

    setError(''); 
    
    onAddCity({ name, country: country || 'AR' });
    
    setName('');
    setCountry('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        backgroundColor: '#16161a', // Fondo oscuro principal
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        marginBottom: '30px',
        color: '#fffffe',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', borderBottom: '1px solid #242629', paddingBottom: '10px' }}>
        ➕ Agregar Nueva Ciudad
      </h3>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        <div style={{ flex: '2', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Nombre de la ciudad... (Ej: Formosa)" 
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              backgroundColor: '#242629', 
              border: error ? '1px solid #ef4565' : '1px solid #242629', // Borde rojo si hay error
              borderRadius: '8px',
              color: '#fffffe',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            // Efectos de foco
            onFocus={(e) => !error && (e.target.style.border = '1px solid #7f5af0')}
            onBlur={(e) => !error && (e.target.style.border = '1px solid #242629')}
          />
          {/* Mensaje de error condicional */}
          {error && <span style={{ color: '#ef4565', fontSize: '13px', fontWeight: 'bold' }}>{error}</span>}
        </div>

        {/* Contenedor del Input País */}
        <div style={{ flex: '1', minWidth: '100px' }}>
          <input 
            type="text" 
            placeholder="País (Ej: AR)" 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px 16px', 
              backgroundColor: '#242629', 
              border: '1px solid #242629', 
              borderRadius: '8px',
              color: '#fffffe',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.border = '1px solid #7f5af0'}
            onBlur={(e) => e.target.style.border = '1px solid #242629'}
          />
        </div>

        {/* Botón Guardar */}
        <button 
          type="submit"
          style={{
            padding: '0 24px',
            backgroundColor: '#7f5af0',
            color: '#fffffe',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s, transform 0.1s',
            height: '42px' // Altura fija para que alinee perfecto con los inputs
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#6b46c1'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#7f5af0'}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Guardar
        </button>

      </div>
    </form>
  );
};

export default CityForm;