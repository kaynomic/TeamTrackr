import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteCommentThunk, loadCommentThunk, loadPostCommentsThunk } from '../../../store/comments';

function CommentPage() {

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts);
    const comment = useSelector(state => state.comments);
    // console.log(comment.user.id)
    // console.log(comment.user.id, "???")
    const {postId, commentId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadPostCommentsThunk(postId))
        dispatch(loadCommentThunk(commentId))
    }, [dispatch, commentId, postId])

    const handleEdit = () => {
        history.push(`/comments/${commentId}/edit`)
    }

    const handleDelete = (commentId) => {
        dispatch(deleteCommentThunk(commentId)).then(history.push(`/users/${user.id}/posts`))
    }

    const handleComments = () => {
        if (user.id === comment.user.id) {
            return (
                <div className='comment-buttons-container'>
                    <button onClick={handleEdit} className='comment-edit-button'>Edit Comment</button>
                    <button onClick={() => handleDelete(commentId)}className='post-delete-button'>Delete Comment</button>
                </div>
            )
        }
    }

  return (
    <div className='comment-page-container'>
        <div>{user.username}</div>
        <div>{comment.body}</div>
        <br></br>
        <div className='comment-buttons-container'>
            {handleComments()}
        </div>
    </div>
  );
}

export default CommentPage;