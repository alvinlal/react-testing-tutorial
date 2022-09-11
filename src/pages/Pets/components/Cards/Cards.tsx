import Card from '../Card/Card';
import './Cards.css';

interface CardsProps {
  cats: Cat[];
  updateFavoured: (index: number, favoured: boolean) => void;
}

const Cards: React.FC<CardsProps> = ({ cats, updateFavoured }) => {
  return (
    <div className='pet-cards-container'>
      {cats.map((cat, index) => (
        <Card key={cat.id} {...cat} updateFavoured={updateFavoured} index={index} />
      ))}
    </div>
  );
};

export default Cards;
