import './Filter.css';

const Filter: React.FC = () => {
  return (
    <div className='pet-filter-container'>
      <div className='filter-container'>
        <label htmlFor='favorite'>Favorite</label>
        <select name='favorite' id='favorite' className='form-select'>
          <option value='any'>any</option>
          <option value='favoured'>favoured</option>
          <option value='not favoured'>not favoured</option>
        </select>
      </div>
      <div className='filter-container'>
        <label htmlFor='gender'>Gender</label>
        <select name='gender' id='gender' className='form-select'>
          <option value='any'>any</option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
