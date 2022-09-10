/**
 * Requirements
 * 1. Should be able to change value of favorite select
 * 2. Should be able to change value of gender select
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from '../Filter';

describe('Filter.tsx', () => {
  it('Should be able to change value of favorite select', () => {
    render(<Filter />);
    const select = screen.getByLabelText('Favorite') as HTMLSelectElement;
    expect(select.value).toBe('any');
    userEvent.selectOptions(select, 'favoured');
    expect(select.value).toBe('favoured');
    userEvent.selectOptions(select, 'not favoured');
    expect(select.value).toBe('not favoured');
  });

  it('Should be able to change value of gender select', () => {
    render(<Filter />);
    const select = screen.getByLabelText('Gender') as HTMLSelectElement;
    expect(select.value).toBe('any');
    userEvent.selectOptions(select, 'male');
    expect(select.value).toBe('male');
    userEvent.selectOptions(select, 'female');
    expect(select.value).toBe('female');
  });
});
