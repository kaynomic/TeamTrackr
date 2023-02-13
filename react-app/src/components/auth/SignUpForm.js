import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom';
// import { allPostsThunk } from '../../store/posts';
import { signUp } from '../../store/session';
import './SignupForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(["Passwords do not match"]);
    } else if (!email.includes("@")) {
      setErrors(["Email is invalid"]);
    } else {
      const data = await dispatch(signUp(username, email, password, image))
      .then(history.push('/me'))
      if (data) {
        setErrors(data)
      }     
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateImage = (e) => {
    setImage(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/me' />;
  }

  return (
    <div className='su-container'>
      <form onSubmit={onSignUp} className="signup-form-container">
        <div>
        {errors.map((error, ind) => (
          <div key={ind} className='signup-error'>{error}</div>
        ))}
        </div>
        <div>
          <h1 className='signup-header'>Create an account</h1>
        {/* <p className='username-header'>USERNAME</p> */}
          <input
          className='username-input'
          type='text'
          placeholder='Username'
          name='username'
          onChange={updateUsername}
          value={username}
          required
        ></input>
        </div>
        <div>
        {/* <p className='signup-email-header'>EMAIL</p> */}
        <input
          className='signup-email-input'
          type='text'
          placeholder='Email'
          name='email'
          onChange={updateEmail}
          value={email}
          required
        ></input>
        </div>
        <div>
        {/* <p className='signup-image-header'>PROFILE PICTURE</p> */}
        <input
          className='signup-image-input'
          type='text'
          placeholder='Image Link'
          name='image'
          onChange={updateImage}
          value={image}
          required
        ></input>
        </div>
        <div>
        {/* <p className='signup-password-header'>PASSWORD</p> */}
          <input
          className='signup-password-input'
          type='password'
          placeholder='Password'
          name='password'
          onChange={updatePassword}
          value={password}
          required
        ></input>
        </div>
        <div>
        {/* <p className='repeat-password-header'>REPEAT PASSWORD</p> */}
        <input
          className='repeat-password-input'
          type='password'
          placeholder='Repeat Password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required
        ></input>
        </div>
        <div className='signup-button-container'>
          <button type='submit' className='signup-button'>Sign Up</button>
        </div>
        <Link to='/login' className='signup-hyperlink'>
        <p className='account-owner'>Already have an account?</p>
        </Link>
    </form>
  </div>
  );
};

export default SignUpForm;
