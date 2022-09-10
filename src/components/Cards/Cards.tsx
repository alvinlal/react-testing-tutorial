import Card from '../Card/Card';
import './Cards.css';

const Cards: React.FC<{ cats: Cat[] }> = ({ cats }) => {
  return (
    <div className='pet-cards-container'>
      {cats.map(cat => (
        <Card key={cat.id} {...cat} />
      ))}
    </div>
  );
};

export default Cards;
