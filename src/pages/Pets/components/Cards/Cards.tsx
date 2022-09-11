import Card from '../Card/Card';
import './Cards.css';

interface CardsProps {
  cats: Cat[];
}

const Cards: React.FC<CardsProps> = ({ cats }) => {
  return (
    <div className='pet-cards-container'>
      {cats.map((cat, index) => (
        <Card key={cat.id} {...cat} index={index} />
      ))}
    </div>
  );
};

export default Cards;
