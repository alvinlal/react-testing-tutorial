import { useState } from 'react';
import { ReactComponent as HeartFilled } from '../../../../assets/icons/heartFilled.svg';
import { ReactComponent as HeartOutlined } from '../../../../assets/icons/heartOutlined.svg';
import usePets from '../../hooks/usePets';
import './Card.css';

interface CardProps extends Cat {
  index: number;
}

const Card: React.FC<CardProps> = ({
  index,
  name,
  phone,
  email,
  image: { url, alt },
  favoured,
}) => {
  const { updateFavoured } = usePets();
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
