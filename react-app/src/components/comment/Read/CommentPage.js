import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteCommentThunk, loadCommentThunk } from '../../../store/comments';
import { loadPostThunk } from '../../../store/posts';
import { authenticate } from '../../../store/session';
import './CommentPage.css';

function CommentPage() {

    const currentUser = useSelector(state => state.session.user);
    // const post = useSelector(state => state.posts);
    const comments = useSelector(state => state.comments);
    const {postId, commentId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadPostThunk(postId))
        dispatch(loadCommentThunk(commentId))
    }, [dispatch, commentId, postId])

    if (!currentUser) {
        dispatch(authenticate());
        return null;
    }


    const handleEdit = () => {
        history.push(`/posts/${postId}/comments/${commentId}/edit`)
    }

    const handleDelete = (commentId) => {
        const data = dispatch(deleteCommentThunk(commentId))
        return data.then(history.push(`/posts/${postId}`))
    }

    const handleComments = () => {
        if (comments && comments.user) {
            if (currentUser.id === comments.user.id) {
                return (
                    <div className='comment-buttons-container'>
                        <button onClick={handleEdit} className='comment-edit-button'>Edit Comment</button>
                        <button onClick={() => handleDelete(commentId)}className='post-delete-button'>Delete Comment</button>
                    </div>
                )
            }
        }
    }

    return (
        <>
    <div className='comment-page-container'>
        <div>{comments.user.username}</div>
        <br></br>
        <div>{comments.body}</div>       
    </div>
    <div className='comment-buttons-container'>
    {handleComments()}
    </div>
        </>
  );
}


export default CommentPage;