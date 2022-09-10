/**
 * Requirements
 * 1. Should show 5 Card component if the api request is successfull
 * 2. Should show loader when the api request is loading
 * 3. Should show error message when the api request has failed
 * 4. Should be able to filter by favorited
 * 5. Should be able to filter by cat gender
 */

import { render, screen } from '@testing-library/react';
import { server, rest } from '../../../../test-utils/server';
import Pets from '../../Pets';

describe('Pets.tsx', () => {
  it('Should show 5 Card component if the api request is successfull', async () => {
    render(<Pets />);
    const cards = await screen.findAllByTestId('cat-card');
    expect(cards.length).toBe(5);
  });

  it('Should show loader when the api request is loading', async () => {
    render(<Pets />);
    const loader = await screen.findByText('loading cats...');
    expect(loader).toBeInTheDocument();
  });

  it('Should show error message when the api request has failed', async () => {
    server.use(
      rest.get('https://631c5fa04fa7d3264caca918.mockapi.io/api/cats', async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'internal server error' }));
      })
    );

    render(<Pets />);

    expect(
      await screen.findByRole('heading', {
        name: 'something went wrong',
      })
    ).toBeInTheDocument();
  });
});
