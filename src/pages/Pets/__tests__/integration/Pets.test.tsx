/**
 * Requirements
 * 1. Should show 5 Card component if the api request is successfull
 * 2. Should show loader when the api request is loading
 * 3. Should show error message when the api request has failed
 * 4. Should be able to filter by male cats
 * 5. Should be able to filter by female cats
 * 5. Should be able to filter by favorited cats
 * 6. Should be able to filter by not favorited cats
 * 7. Should be able to filter by favoured male cats
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server, rest } from '../../../../test-utils/server';
import { PetsProvider } from '../../contexts/PetsContext';
import Pets from '../../Pets';

describe('Pets.tsx', () => {
  it('Should show 5 Card component if the api request is successfull', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const cards = await screen.findAllByTestId('cat-card');
    expect(cards.length).toBe(5);
  });

  it('Should show loader when the api request is loading', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const loader = await screen.findByText('loading cats...');
    expect(loader).toBeInTheDocument();
  });

  it('Should show error message when the api request has failed', async () => {
    server.use(
      rest.get('https://631c5fa04fa7d3264caca918.mockapi.io/api/cats', async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'internal server error' }));
      })
    );

    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );

    expect(
      await screen.findByRole('heading', {
        name: 'something went wrong',
      })
    ).toBeInTheDocument();
  });

  it('Should be able to filter by male cats', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const cards = await screen.findAllByTestId('cat-card');
    const genderFilter = screen.getByLabelText('Gender');
    userEvent.selectOptions(genderFilter, 'male');
    const maleCatCards = screen.getAllByTestId('cat-card');
    expect(maleCatCards).toStrictEqual([cards[1], cards[3]]);
  });

  it('Should be able to filter by female cats', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const cards = await screen.findAllByTestId('cat-card');
    const genderFilter = screen.getByLabelText('Gender');
    userEvent.selectOptions(genderFilter, 'female');
    const maleCatCards = screen.getAllByTestId('cat-card');
    expect(maleCatCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });

  it('Should be able to filter by favorited cats', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const cards = await screen.findAllByTestId('cat-card');
    userEvent.click(within(cards[0]).getByRole('button'));
    userEvent.click(within(cards[3]).getByRole('button'));
    const favoriteFilter = screen.getByLabelText('Favorite');
    userEvent.selectOptions(favoriteFilter, 'favoured');
    const favoritedCatCards = screen.getAllByTestId('cat-card');
    expect(favoritedCatCards).toStrictEqual([cards[0], cards[3]]);
  });

  it('Should be able to filter by not favorited cats', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const cards = await screen.findAllByTestId('cat-card');
    userEvent.click(within(cards[0]).getByRole('button'));
    userEvent.click(within(cards[4]).getByRole('button'));
    const favoriteFilter = screen.getByLabelText('Favorite');
    userEvent.selectOptions(favoriteFilter, 'not favoured');
    const notFavoritedCatCards = screen.getAllByTestId('cat-card');
    expect(notFavoritedCatCards).toStrictEqual([cards[1], cards[2], cards[3]]);
  });

  it('Should be able to filter by favoured male cats', async () => {
    render(
      <PetsProvider>
        <Pets />
      </PetsProvider>
    );
    const cards = await screen.findAllByTestId('cat-card');
    userEvent.click(within(cards[0]).getByRole('button'));
    userEvent.click(within(cards[3]).getByRole('button'));
    const favoriteFilter = screen.getByLabelText('Favorite');
    userEvent.selectOptions(favoriteFilter, 'favoured');
    const genderFilter = screen.getByLabelText('Gender');
    userEvent.selectOptions(genderFilter, 'male');
    const favouredMaleCatCards = screen.getAllByTestId('cat-card');
    expect(favouredMaleCatCards).toStrictEqual([cards[3]]);
  });
});
