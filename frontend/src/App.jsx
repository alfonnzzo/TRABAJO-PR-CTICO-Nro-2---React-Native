import Dashboard from './pages/Dashboard';
import { CityProvider } from './context/CityContext';

function App() {
  return (
    <CityProvider>
      <Dashboard />
      
    </CityProvider>
  );
}

export default App;