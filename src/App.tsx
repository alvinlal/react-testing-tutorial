import './App.css';
import { PetsProvider } from './pages/Pets/contexts/PetsContext';
import Pets from './pages/Pets/Pets';
function App() {
  return (
    <div>
      <PetsProvider>
        <Pets />
      </PetsProvider>
    </div>
  );
}

export default App;
