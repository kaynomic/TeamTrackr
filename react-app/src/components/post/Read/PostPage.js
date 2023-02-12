import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { loadPostCommentsThunk } from '../../../store/comments';
import { deletePostThunk, loadPostThunk } from '../../../store/posts';
import './PostPage.css';

function PostPage() {

    const currentUser = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts);
    // const comments = useSelector(state => state.comments);
    const {postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const rerendPost = () => {
      setTimeout(() => {
        dispatch(loadPostThunk(postId))
      }, 100);
    }

    useEffect(() => {
      dispatch(loadPostThunk(postId))
      dispatch(loadPostCommentsThunk(postId))
      rerendPost()
    }, [dispatch, postId])

    const handleEdit = () => {
        history.push(`/posts/${postId}/edit`)
    }

    const handleDelete = (postId) => {
        const data = dispatch(deletePostThunk(postId)).then(history.push(`/me`))
        return data
    }

    const addComment = () => {
        history.push(`/posts/${postId}/comments/create`)
    }

    const showComments = () => {
      if (post.comments) {
        return post.comments.map(comment => {
          return (
            <div className='comment-container'>
              <div className='comment-header'>
                <p>{comment.user["username"]}</p>
                <Link key={comment.id} to={`/posts/${postId}/comments/${comment.id}`}>
                  <p className='comment-body'>{comment.body}</p>
                </Link>
              </div>
            </div>
          );
        });
      }
    };
      

  return (
    <>
    <div className='post-page-container'>
      <div className='post-header'>{currentUser.username}</div>
      <div className='post-body'>{post.body}</div>
      <br></br>
      {showComments()}
    </div>
    <div className='post-buttons-container'>
      <button onClick={handleEdit} className='post-edit-button'>Edit Post</button>
      <button onClick={() => handleDelete(postId)}className='post-delete-button'>Delete Post</button>
      <button onClick={addComment}className='add-comment-button'>Add A Comment</button>
    </div>
    </>
  );
}

export default PostPage;