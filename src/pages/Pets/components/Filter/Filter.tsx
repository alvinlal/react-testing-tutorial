import React from 'react';
import './Filter.css';

export interface FilterOptions {
  favorite: 'any' | 'favoured' | 'not favoured';
  gender: 'any' | 'male' | 'female';
}

interface FilterProps {
  setFilters:
    | React.Dispatch<React.SetStateAction<(value: FilterOptions) => FilterOptions>>
    | React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const Filter: React.FC<FilterProps> = ({ setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((value: FilterOptions) => ({
      ...value,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className='pet-filter-container'>
      <div className='filter-container'>
        <label htmlFor='favorite'>Favorite</label>
        <select name='favorite' id='favorite' className='form-select' onChange={handleChange}>
          <option value='any'>any</option>
          <option value='favoured'>favoured</option>
          <option value='not favoured'>not favoured</option>
        </select>
      </div>
      <div className='filter-container'>
        <label htmlFor='gender'>Gender</label>
        <select name='gender' id='gender' className='form-select' onChange={handleChange}>
          <option value='any'>any</option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
