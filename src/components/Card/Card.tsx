import { useState } from 'react';
import { ReactComponent as HeartFilled } from '../../assets/icons/heartFilled.svg';
import { ReactComponent as HeartOutlined } from '../../assets/icons/heartOutlined.svg';
import './Card.css';

export interface CardProps {
  name: string;
  phone: number;
  email: string;
  image: {
    url: string;
    alt: string;
  };
  favoured: boolean;
}

const Card: React.FC<CardProps> = ({ name, phone, email, image: { url, alt }, favoured }) => {
  const [isFavoured, setIsFavoured] = useState<boolean>(favoured);

  return (
    <div className='card'>
      <div className='card-header'>
        <img src={url} alt={alt} className='card-img' />
        <button className='heart' onClick={() => setIsFavoured(!isFavoured)}>
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
