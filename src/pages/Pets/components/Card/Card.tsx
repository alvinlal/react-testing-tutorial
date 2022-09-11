import { useState } from 'react';
import { ReactComponent as HeartFilled } from '../../../../assets/icons/heartFilled.svg';
import { ReactComponent as HeartOutlined } from '../../../../assets/icons/heartOutlined.svg';
import './Card.css';

interface CardProps extends Cat {
  index: number;
  updateFavoured: (index: number, favoured: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  index,
  name,
  phone,
  email,
  image: { url, alt },
  favoured,
  updateFavoured,
}) => {
  const [isFavoured, setIsFavoured] = useState<boolean>(favoured);

  const toggleFavoured = () => {
    updateFavoured(index, !isFavoured);
    setIsFavoured(!isFavoured);
  };

  return (
    <div className='card' data-testid='cat-card'>
      <div className='card-header'>
        <img src={url} alt={alt} className='card-img' />
        <button className='heart' onClick={toggleFavoured}>
          {isFavoured ? (
            <HeartFilled data-testid='filled-heart' />
          ) : (
            <HeartOutlined data-testid='outlined-heart' />
          )}
        </button>
        <div className='card-content'>
          <h3>{name}</h3>
          <p>{phone}</p>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
