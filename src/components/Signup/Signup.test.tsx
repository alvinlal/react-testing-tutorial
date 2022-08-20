/*
 * 1. All inputs in the signup form should be initially empty
 * 2. Should be able to type an email
 * 3. Should be able to type a password
 * 4. Should be able to type a confirm password
 * 5. Should show email error message on invalid email
 * 6. Should show email error message only if both email and password is invalid
 * 7. Should show password error if password length is less than 5 characters
 * 8. Should show confirm password error if password and confirm password fields don't match
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should be able to type an email', () => {
    render(<Signup />);
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    }) as HTMLInputElement;
    userEvent.type(emailInputElement, 'alvin@gmail.com');
    expect(emailInputElement.value).toBe('alvin@gmail.com');
  });

  it('should be able to type a password', () => {
    render(<Signup />);
    const passwordInputElement = screen.getByLabelText('Password') as HTMLInputElement;
    userEvent.type(passwordInputElement, 'test123');
    expect(passwordInputElement.value).toBe('test123');
  });
  it('should be able to type a confirm password', () => {
    render(<Signup />);
    const confirmPasswordInputElement = screen.getByLabelText(
      'Confirm Password'
    ) as HTMLInputElement;
    userEvent.type(confirmPasswordInputElement, 'test123');
    expect(confirmPasswordInputElement.value).toBe('test123');
  });
  it('should show invalid email error message on invalid email', () => {
    render(<Signup />);

    let emailErrorElement = screen.queryByText(/the email you input is invalid/i);
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(emailErrorElement).not.toBeInTheDocument();

    userEvent.type(emailInputElement, 'alvingmail.com');
    userEvent.click(submitBtnElement);

    emailErrorElement = screen.queryByText(/the email you input is invalid/i);

    expect(emailErrorElement).toBeInTheDocument();
  });
});
