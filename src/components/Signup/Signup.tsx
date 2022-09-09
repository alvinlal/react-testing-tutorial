import { ChangeEvent, useState, MouseEvent } from 'react';
import validator from 'validator';
export interface SignupInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [signupInput, setSignInput] = useState<SignupInput>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setError('');
    if (!validator.isEmail(signupInput.email)) {
      setError('the email you input is invalid');
    } else if (signupInput.password.length < 5) {
      setError('password should contain atleast 5 characters');
    } else if (signupInput.confirmPassword !== signupInput.password) {
      setError("passwords don't match");
    }
  };

  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='confirm-password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirm-password'
            name='confirmPassword'
            className='form-control'
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button type='submit' name='submit' className='btn btn-primary' onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
