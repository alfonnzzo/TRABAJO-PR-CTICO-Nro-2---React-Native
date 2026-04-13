import { useWeather } from '../hooks/useWeather';

export default function WeatherDash({ ciudadesDesdeApp = [], onDelete }) {
  const { climas } = useWeather(ciudadesDesdeApp);

  const traducirClima = (codigo) => {
    const codigos = {
      0: 'Despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado', 3: 'Nublado',
      45: 'Niebla', 48: 'Niebla escarcha',
      51: 'Llovizna', 53: 'Llovizna', 55: 'Llovizna',
      61: 'Lluvia leve', 63: 'Lluvia moderada', 65: 'Lluvia fuerte',
      80: 'Chubascos', 81: 'Chubascos', 82: 'Tormenta',
      95: 'Tormenta', 96: 'Tormenta', 99: 'Tormenta'
    };
    return codigos[codigo] || 'Desconocido';
  };

  const obtenerDiaSemana = (fechaString) => {
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const fecha = new Date(fechaString + 'T00:00:00');
    return dias[fecha.getDay()];
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
        {ciudadesDesdeApp.map(ciudad => {
          const nombre = ciudad.name || ciudad.nombre;
          const datosCiudad = climas[nombre];

          return (
            <div key={ciudad.id || nombre} style={{ 
              backgroundColor: '#16161a', 
              borderRadius: '16px', 
              padding: '24px', 
              color: '#fffffe',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              maxWidth: '800px',
              margin: '0 auto',
              width: '100%',
              position: 'relative'
            }}>
              
              <button 
                onClick={() => onDelete(ciudad.id)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  backgroundColor: '#ef4565', color: 'white', border: 'none',
                  borderRadius: '50%', width: '32px', height: '32px',
                  cursor: 'pointer', fontWeight: 'bold', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d33350'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4565'}
                title="Eliminar ciudad"
              >
                ✕
              </button>

              <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>
                {nombre} ({ciudad.country || 'AR'}) - Panel Climático
              </h2>

              {datosCiudad ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                      <p style={{ fontSize: '48px', margin: '0', fontWeight: 'bold' }}>
                        {Math.round(datosCiudad.actual.temperature)}°C
                      </p>
                      <p style={{ fontSize: '20px', margin: '5px 0 0 0', color: '#94a1b2' }}>
                        {traducirClima(datosCiudad.actual.weathercode)}
                      </p>
                    </div>
                    <div style={{ fontSize: '64px' }}>
                      {datosCiudad.actual.weathercode <= 2 ? '☀️' : '☁️'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '24px' }}>
                    {datosCiudad.diario.time.slice(0, 7).map((fecha, index) => (
                      <div key={fecha} style={{ 
                        backgroundColor: '#242629', borderRadius: '12px', padding: '12px', 
                        minWidth: '60px', textAlign: 'center', flex: '1'
                      }}>
                        <p style={{ margin: '0 0 8px 0', color: '#94a1b2', fontSize: '14px' }}>{obtenerDiaSemana(fecha)}</p>
                        <p style={{ margin: '0', fontWeight: 'bold' }}>{Math.round(datosCiudad.diario.temperature_2m_max[index])}°</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 style={{ fontSize: '18px', margin: '0 0 16px 0', borderBottom: '1px solid #242629', paddingBottom: '8px' }}>
                      Pronóstico de Corto Plazo: Próximas 6 horas
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100px', padding: '20px 0 0 0' }}>
                      {datosCiudad.porHora.temperature_2m.slice(new Date().getHours(), new Date().getHours() + 6).map((temp, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15%' }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>{Math.round(temp)}°</span>
                          <div style={{ 
                            width: '4px', height: `${(temp / 40) * 80}px`, 
                            backgroundColor: '#7f5af0', borderRadius: '4px' 
                          }}></div>
                          <span style={{ fontSize: '12px', color: '#94a1b2', marginTop: '8px' }}>
                            {(new Date().getHours() + index) % 24}:00
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ color: '#94a1b2' }}>Conectando con satélite...</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}