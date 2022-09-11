/**
 * Requirements
 * 1. Should render 5 Card components
 */

import { render, screen } from '@testing-library/react';
import cats from '../../../../../../test-utils/mocks/cats.json';
import Cards from '../../Cards';

describe('Cards.tsx', () => {
  it('Should render 5 Card components', () => {
    render(<Cards updateFavoured={() => {}} cats={cats} />);
    expect(screen.getAllByTestId('cat-card').length).toBe(5);
  });
});
