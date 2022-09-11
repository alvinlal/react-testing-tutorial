import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import Filter, { FilterOptions } from './components/Filter/Filter';
import usePets from './hooks/usePets';
import './Pets.css';

const Pets: React.FC = () => {
  const { cats, status } = usePets();
  const [filteredCats, setFilteredCats] = useState<Cat[]>(cats);
  const [filters, setFilters] = useState<FilterOptions>({
    gender: 'any',
    favorite: 'any',
  });

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
  }, [filters, cats]);

  return (
    <div className='container'>
      <div className='app-container'>
        <Filter setFilters={setFilters} />
        {status === 'loading' && <p>loading cats...</p>}
        {status === 'error' && <h3>something went wrong</h3>}
        {status === 'success' && <Cards cats={filteredCats} />}
      </div>
    </div>
  );
};

export default Pets;
