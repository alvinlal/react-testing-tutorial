import './App.css';
import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import Signup from './components/Signup/Signup';
import cats from './test-utils/mocks/cats.json';

function App() {
  return (
    <div>
      <Cards cats={cats} />
    </div>
  );
}

export default App;
