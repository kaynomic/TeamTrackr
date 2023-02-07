import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { editPostThunk, loadPostThunk } from '../../../store/posts';
import './EditPost.css';


const EditPostForm = () => {
  const [error, setError] = useState(null);
  const [body, setBody] = useState('');
  const [image, SetImage] = useState('');
//   const user = useSelector(state => state.session.user);
  const {postId} = useParams();
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

    return dispatch(editPostThunk(postId, body)).then(history.push('/me'))

  };

  useEffect(() => {
    dispatch(loadPostThunk(postId))
  }, [dispatch, postId, error]);

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const updateImage = (e) => {
    SetImage(e.target.value);
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className='edit-form-container'>
      <div>
      {(error !== null) && <h1 className='dm-user-error'>{error}</h1>}
      </div>
      <div>
      <h1 className='edit-form-header'>Edit a Post</h1>
        {/* <p className='create-form-server'>SERVER NAME</p> */}
        <input
          className='edit-form-body-input'
          name='body'
          type='text'
          placeholder={'What are you thinking?'}
          value={body}
          onChange={updateBody}
          required
        />
      </div>
      <div>
        {/* <p className='create-form-image'>IMAGE</p> */}
        <input
          className='edit-form-image-input'
          name='image'
          type='text'
          placeholder='Enter a valid image url'
          value={image}
          onChange={updateImage}
        />
        <div className='edit-form-button-container'>
        <button type='submit' className='edit-form-button'>Complete</button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default EditPostForm;