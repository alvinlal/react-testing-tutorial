/*eslint-disable  testing-library/no-render-in-setup*/

/* Requirements:-
 * 1. All inputs should be initially empty
 * 2. Should be able to type an email
 * 3. Should be able to type a password
 * 4. Should be able to type a confirm password
 * 5. Should show email error message on invalid email
 * 6. Should show password error message on invalid password
 * 7. Should show confirm password error message if passwords don't match
 * 8. Should not show any error message if every input is valid
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup, { SignupProps } from './Signup';

describe('Signup.tsx', () => {
  const typeIntoForm = ({ email, password, confirmPassword }: Partial<SignupProps>) => {
    const emailInputElement = screen.getByRole('textbox') as HTMLInputElement;
    const passwordInputElement = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInputElement = screen.getByLabelText(
      'Confirm Password'
    ) as HTMLInputElement;

    const emailErrorElement = screen.queryByText(/the email you input is invalid/i);
    const passwordErrorElement = screen.queryByText(
      /password should contain atleast 5 characters/i
    );
    const confirmPasswordErrorElement = screen.queryByText(/passwords don't match/i);

    if (email) {
      userEvent.type(emailInputElement, email);
    }
    if (password) {
      userEvent.type(passwordInputElement, password);
    }
    if (confirmPassword) {
      userEvent.type(confirmPasswordInputElement, confirmPassword);
    }
    return {
      emailInputElement,
      passwordInputElement,
      confirmPasswordInputElement,
      emailErrorElement,
      passwordErrorElement,
      confirmPasswordErrorElement,
    };
  };

  const clickOnSubmitBtn = () => {
    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i,
    }) as HTMLButtonElement;

    userEvent.click(submitBtnElement);
  };

  beforeEach(() => {
    render(<Signup />);
  });

  it('All inputs should be initially empty', () => {
    const { passwordInputElement, emailInputElement, confirmPasswordInputElement } = typeIntoForm(
      {}
    );
    expect(passwordInputElement.value).toBe('');
    expect(emailInputElement.value).toBe('');
    expect(confirmPasswordInputElement.value).toBe('');
  });

  it('should be able to type an email', () => {
    const { emailInputElement } = typeIntoForm({
      email: 'alvin@gmail.com',
    });
    expect(emailInputElement.value).toBe('alvin@gmail.com');
  });

  it('should be able to type a password', () => {
    const { passwordInputElement } = typeIntoForm({
      password: 'test123',
    });
    expect(passwordInputElement.value).toBe('test123');
  });

  it('should be able to type a confirm password', () => {
    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: 'test123',
    });
    expect(confirmPasswordInputElement.value).toBe('test123');
  });

  it('should show invalid email error message on invalid email', () => {
    const { emailErrorElement } = typeIntoForm({
      email: 'alvingmail.com',
    });
    expect(emailErrorElement).not.toBeInTheDocument();
    clickOnSubmitBtn();
    expect(screen.getByText(/the email you input is invalid/i)).toBeInTheDocument();
  });

  it('Should show password error message on invalid password', () => {
    const { passwordErrorElement } = typeIntoForm({
      email: 'alvin@gmail.com',
      password: 'abc',
    });
    expect(passwordErrorElement).not.toBeInTheDocument();
    clickOnSubmitBtn();
    expect(screen.getByText(/password should contain atleast 5 characters/i)).toBeInTheDocument();
  });

  it("Should show confirm password error message if passwords don't match", () => {
    const { confirmPasswordErrorElement } = typeIntoForm({
      email: 'alvin@gmail.com',
      password: '12345',
      confirmPassword: '123456',
    });
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
    clickOnSubmitBtn();
    expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
  });

  it('Should not show any error message if every input is valid', () => {
    const { emailErrorElement, passwordErrorElement, confirmPasswordErrorElement } = typeIntoForm({
      email: 'alvin@gmail.com',
      password: '12345',
      confirmPassword: '12345',
    });
    clickOnSubmitBtn();
    expect(emailErrorElement).not.toBeInTheDocument();
    expect(passwordErrorElement).not.toBeInTheDocument();
    expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  });
});
