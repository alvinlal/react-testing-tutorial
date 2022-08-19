/*
 * 1. All inputs in the signup form should be initially empty
 */

import { render, screen } from '@testing-library/react';
import Signup from './Signup';

describe('Signup.tsx', () => {
  it('All inputs should be initially empty', () => {
    render(<Signup />);
    const emailInputElement = screen.getByRole('textbox') as HTMLInputElement;
    const passwordInputElement = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInputElement = screen.getByLabelText(
      'Confirm Password'
    ) as HTMLInputElement;

    expect(passwordInputElement.value).toBe('');
    expect(emailInputElement.value).toBe('');
    expect(confirmPasswordInputElement.value).toBe('');
  });
});
