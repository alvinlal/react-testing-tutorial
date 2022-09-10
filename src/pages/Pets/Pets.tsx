import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import Filter from './components/Filter/Filter';
import './Pets.css';

const Pets: React.FC = () => {
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [status, setStatus] = useState('idle');

  const fetchCats = async () => {
    try {
      setStatus('loading');
      const data = await fetch('https://631c5fa04fa7d3264caca918.mockapi.io/api/cats').then(res => {
        if (!res.ok) {
          throw new Error('something went wrong');
        }
        return res.json();
      });
      if (!data.error) {
        setCats(data);
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className='container'>
      <div className='app-container'>
        <Filter />
        {status === 'loading' && <p>loading cats...</p>}
        {status === 'error' && <h3>something went wrong</h3>}
        {status === 'success' && cats && <Cards cats={cats} />}
      </div>
    </div>
  );
};

export default Pets;
