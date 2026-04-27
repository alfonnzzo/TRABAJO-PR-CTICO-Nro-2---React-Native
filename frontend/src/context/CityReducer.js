export const cityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CITIES':
      // Carga inicial desde la API
      return action.payload;
      
    case 'ADD_CITY':
      // Agrega una nueva ciudad al estado actual
      return [...state, action.payload];
      
    case 'DELETE_CITY':
      // Filtra y elimina por ID
      return state.filter(city => city.id !== action.payload);
      
    case 'EDIT_CITY':
      // Busca la ciudad por ID y la reemplaza con los nuevos datos
      return state.map(city => 
        city.id === action.payload.id ? action.payload : city
      );
      
    default:
      return state;
  }
};