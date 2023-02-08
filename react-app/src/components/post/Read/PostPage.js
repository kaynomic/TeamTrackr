import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deletePostThunk, loadPostThunk } from '../../../store/posts';

function PostPage() {

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts)
    const {postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadPostThunk(postId))
    }, [dispatch, postId])

    const handleEdit = () => {
        history.push(`/posts/${postId}/edit`)
    }

    const handleDelete = (postId) => {
        dispatch(deletePostThunk(postId)).then(history.push(`/users/${user.id}/posts`))
    }

    const showComments = () => {
        if (post.comments) {
            return (
            <div>{post.comments.map(comment => {
                return (comment.body)
            })}</div>
            )
        }
    }

  return (
    <div className='post-page-container'>
        <div>{user.username}</div>
        <div>{post.body}</div>
        <br></br>
        {showComments()}
        <div className='post-buttons-container'>
            <button onClick={handleEdit} className='post-edit-button'>Edit Post</button>
            <button onClick={() => handleDelete(postId)}className='post-delete-button'>Delete Post</button>
        </div>
    </div>
  );
}

export default PostPage;