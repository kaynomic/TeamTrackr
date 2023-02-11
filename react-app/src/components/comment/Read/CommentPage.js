import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteCommentThunk, loadPostCommentsThunk } from '../../../store/comments';

function CommentPage() {

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts);
    const comment = Object.values(useSelector(state => state.comments));
    // const commentUserId = post.comments[0].user.id;
    console.log(comment, "???")
    const {postId, commentId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(loadPostCommentsThunk(postId))
    }, [dispatch, postId])

    const handleEdit = () => {
        history.push(`/comments/${commentId}/edit`)
    }

    const handleDelete = (commentId) => {
        dispatch(deleteCommentThunk(commentId)).then(history.push(`/users/${user.id}/posts`))
    }

    // const handleComments = () => {
    //     if (user.id === commentUserId) {
    //         return (
    //             <div className='comment-buttons-container'>
    //                 <button onClick={handleEdit} className='comment-edit-button'>Edit Comment</button>
    //                 <button onClick={() => handleDelete(commentId)}className='post-delete-button'>Delete Comment</button>
    //             </div>
    //         )
    //     }
    // }

  return (
    <div className='comment-page-container'>
        <div>{user.username}</div>
        <div>{comment.body}</div>
        <br></br>
        <div className='comment-buttons-container'>
            {/* {handleComments()} */}
        </div>
    </div>
  );
}

export default CommentPage;