import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { createCommentThunk } from '../../../store/comments';
import './CreateComment.css';


const CreateCommentForm = () => {
  const [error, setError] = useState(null);
  const [body, setBody] = useState('');
  const [image, SetImage] = useState('');
  // const user = useSelector(state => state.session.user);
  // const post = useSelector(state => state.posts)
  const dispatch = useDispatch();
  const history = useHistory();
  const {postId} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!data) {
    //   setError("Please Try Again")
    //   setBody('')
    //   SetImage('')
    // } else {
    //   setError(null)
    // }

    return dispatch(createCommentThunk(postId, body)).then(history.push(`/posts/${postId}`))

  };

  useEffect(() => {

  }, [dispatch, error]);

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  // const updateImage = (e) => {
  //   SetImage(e.target.value);
  // };

  return (
    <div>
    <form onSubmit={handleSubmit} className='create-form-container'>
      <div>
      {(error !== null) && <h1 className='dm-user-error'>{error}</h1>}
      </div>
      <div>
      <h1 className='create-form-header'>Create a Comment</h1>
        {/* <p className='create-form-server'>SERVER NAME</p> */}
        <input
          className='create-form-body-input'
          name='name'
          type='text'
          placeholder='Type Comment Here'
          value={body}
          onChange={updateBody}
          required
        />
      </div>
      <div>
        {/* <p className='create-form-image'>IMAGE</p> */}
        {/* <input
          className='create-form-image-input'
          name='image'
          type='text'
          placeholder='Enter a valid image url'
          value={image}
          onChange={updateImage}
        /> */}
        <div className='create-form-button-container'>
        <button type='submit' className='create-form-button'>Create Comment</button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default CreateCommentForm;