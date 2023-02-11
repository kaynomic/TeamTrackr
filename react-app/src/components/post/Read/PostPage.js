import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { loadCommentThunk, loadPostCommentsThunk } from '../../../store/comments';
import { deletePostThunk, loadPostThunk } from '../../../store/posts';
import './PostPage.css';

function PostPage() {

    const currentUser = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts);
    const comments = useSelector(state => state.comments);
    console.log(comments)
    const {postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch(loadPostThunk(postId))
      // dispatch(loadCommentThunk(commentId))
      dispatch(loadPostCommentsThunk(postId))
    }, [dispatch, postId])

    const handleEdit = () => {
        history.push(`/posts/${postId}/edit`)
    }

    const handleDelete = (postId) => {
        dispatch(deletePostThunk(postId))
        .then(history.push(`/users/${currentUser.id}/posts`))
    }

    const addComment = () => {
        history.push(`/posts/${postId}/comments/create`)
    }

    // const handlePosts = () => {
    //     if (user.id ===)
    // }

    const showComments = () => {
      if (post.comments) {
        return post.comments.map(comment => {
          return (
            <div className='comment-container'>
              <div className='comment-header'>
                <p>{comment.user["username"]}</p>
                <Link key={comment.id} to={`/comments/${comment.id}`}>
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