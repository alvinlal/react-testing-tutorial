/**
 * Requirements
 * 1. Should display the name of the cat
 * 2. Should display the phone number of the owner
 * 3. Should display the email of the owner
 * 4. Should show the image of the cat with correct src
 * 5. Should show outlined heart
 * 6. Should show filled heart
 * 7. Should toggle heart status
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../../Card';

describe('Card.tsx', () => {
  const cat: Cat = {
    id: 1,
    name: 'Sydney',
    phone: '123456789',
    email: 'sydney@gmail.com',
    image: {
      url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      alt: 'cute-cat',
    },
    favoured: false,
    color: 'grey',
    gender: 'female',
  };

  it('Should display the name of the cat', () => {
    render(<Card {...cat} index={1} />);
    expect(
      screen.getByRole('heading', {
        name: /sydney/i,
      })
    ).toBeInTheDocument();
  });

  it('Should display the phone number of the owner', () => {
    render(<Card {...cat} index={1} />);
    expect(screen.getByText(cat.phone)).toBeInTheDocument();
  });

  it('Should display the email of the owner', () => {
    render(<Card {...cat} index={1} />);
    expect(screen.getByText(cat.email)).toBeInTheDocument();
  });

  it('Should show the image of the cat with correct src', () => {
    render(<Card {...cat} index={1} />);
    expect(screen.getByAltText(cat.image.alt)).toBeInTheDocument();
    expect((screen.getByAltText(cat.image.alt) as HTMLImageElement).src).toBe(cat.image.url);
  });

  it('Should show outlined heart', () => {
    render(<Card {...cat} index={1} />);
    expect(screen.queryByTestId('filled-heart')).not.toBeInTheDocument();
    expect(screen.getByTestId('outlined-heart')).toBeInTheDocument();
  });

  it('Should show filled heart', () => {
    render(<Card {...cat} index={1} favoured={true} />);
    expect(screen.queryByTestId('outlined-heart')).not.toBeInTheDocument();
    expect(screen.getByTestId('filled-heart')).toBeInTheDocument();
  });

  it('Should toggle heart status', () => {
    render(<Card {...cat} index={1} />);

    userEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('filled-heart')).toBeInTheDocument();
    expect(screen.queryByTestId('outlined-heart')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId('filled-heart')).not.toBeInTheDocument();
    expect(screen.getByTestId('outlined-heart')).toBeInTheDocument();
  });
});
