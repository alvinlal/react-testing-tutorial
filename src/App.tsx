import './App.css';
import Card from './components/Card/Card';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <div>
      <Card
        name='Sydney'
        phone={123456789}
        email='sydney@gmail.com'
        image={{
          url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
          alt: 'cute-cat',
        }}
        favoured={false}
      />
    </div>
  );
}

export default App;
