import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import Filter, { FilterOptions } from './components/Filter/Filter';
import './Pets.css';

const Pets: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [filteredCats, setFilteredCats] = useState<Cat[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    gender: 'any',
    favorite: 'any',
  });
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
        setFilteredCats(data);
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const updateFavoured = (index: number, favoured: boolean) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favoured;
    setCats(updatedCats);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];
    if (filters.gender !== 'any') {
      catsFiltered = catsFiltered.filter(cat => cat.gender === filters.gender);
    }
    if (filters.favorite !== 'any') {
      catsFiltered = catsFiltered.filter(
        cat => cat.favoured === (filters.favorite === 'favoured' ? true : false)
      );
    }
    setFilteredCats(catsFiltered);
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className='container'>
      <div className='app-container'>
        <Filter setFilters={setFilters} />
        {status === 'loading' && <p>loading cats...</p>}
        {status === 'error' && <h3>something went wrong</h3>}
        {status === 'success' && <Cards cats={filteredCats} updateFavoured={updateFavoured} />}
      </div>
    </div>
  );
};

export default Pets;
