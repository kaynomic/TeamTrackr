import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { createPostThunk } from '../../../store/posts';
import './CreatePost.css';


const CreatePostForm = () => {
  const [error, setError] = useState(null);
  const [body, setBody] = useState('');
  const [image, SetImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!data) {
    //   setError("Please Try Again")
    //   setBody('')
    //   SetImage('')
    // } else {
    //   setError(null)
    // }

    return dispatch(createPostThunk(body, image)).then(history.push(`/users/${user.id}`))

  };

  useEffect(() => {

  }, [dispatch, error]);

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const updateImage = (e) => {
    SetImage(e.target.value);
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className='create-form-container'>
      <div>
      {(error !== null) && <h1 className='dm-user-error'>{error}</h1>}
      </div>
      <div>
      <h1 className='create-form-header'>Create a Post</h1>
        {/* <p className='create-form-server'>SERVER NAME</p> */}
        <input
          className='create-form-body-input'
          name='name'
          type='text'
          placeholder='What are you thinking?'
          value={body}
          onChange={updateBody}
          required
        />
      </div>
      <div>
        {/* <p className='create-form-image'>IMAGE</p> */}
        <input
          className='create-form-image-input'
          name='image'
          type='text'
          placeholder='Enter a valid image url'
          value={image}
          onChange={updateImage}
        />
        <div className='create-form-button-container'>
        <button type='submit' className='create-form-button'>Create Post</button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default CreatePostForm;