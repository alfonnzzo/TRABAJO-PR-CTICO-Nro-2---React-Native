import { useState, useEffect } from 'react';

export const useWeather = (ciudades = []) => {
  const [climas, setClimas] = useState({});

  useEffect(() => {
    if (!ciudades || ciudades.length === 0) return;

    const obtenerClima = async (nombreCiudad) => {
      // Si ya tenemos el clima, no lo volvemos a pedir
      if (!nombreCiudad || climas[nombreCiudad]) return; 

      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${nombreCiudad}&count=1&language=es&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) return;

        const { latitude, longitude } = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=temperature_2m&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();
        
        if (weatherRes.ok) {
          setClimas(prevClimas => ({ 
            ...prevClimas, 
            [nombreCiudad]: {
              actual: weatherData.current_weather,
              diario: weatherData.daily,
              porHora: weatherData.hourly
            }
          }));
        }
      } catch (error) {
        console.error("Error al buscar el clima de", nombreCiudad);
      }
    };

    ciudades.forEach(ciudad => obtenerClima(ciudad.name || ciudad.nombre));
  }, [ciudades, climas]);

  return { climas };
};