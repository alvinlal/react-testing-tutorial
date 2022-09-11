import { useContext } from 'react';
import { PetsContext } from '../contexts/PetsContext';

const usePets = () => {
  return useContext(PetsContext);
};

export default usePets;
