import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const forDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
    if (data) {
      setErrors(data)
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/me`} />;
  }

  return (
    <div className='login-container'>
    <form onSubmit={onLogin} className="form-container">
      <div>
        {errors.map((error, ind) => (
          <div key={ind} className='error-handle'>{error}</div>
        ))}
      </div>
        <h1 className='login-header'>WELCOME BACK!</h1>
        {/* <p className='email-header'>EMAIL</p> */}
        <label htmlFor='email'></label>
        <input
          className='email-input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
        {/* <p className='password-header'>PASSWORD</p> */}
        <label htmlFor='password'></label>
        <input
          className='password-input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
        {/* <p className='forgot-password'>Forgot your password?</p> */}
      <div>
        <button type='submit' className='login-button'>Login</button>
      </div>
      <div>
        <button type='submit' className='demo-button' onClick={forDemo}>Demo User</button>
      </div>
      <Link to='/signup' className='login-hyperlink'>
        <p className='register-link'>Need an account? Register</p>
      </Link>
    </form>
  </div>
  );
};

export default LoginForm;