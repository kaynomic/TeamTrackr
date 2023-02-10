import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { loadCommentThunk, loadPostCommentsThunk } from '../../../store/comments';
import { allPostsThunk, deletePostThunk, loadPostThunk } from '../../../store/posts';

function PostPage() {

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts);
    // const comment = useSelector(state => state.comments);
    console.log(post, '!!!')
    const {postId, commentId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(allPostsThunk())
        dispatch(loadPostThunk(postId))
        dispatch(loadPostCommentsThunk(postId))
        dispatch(loadCommentThunk(commentId))
    }, [dispatch, postId])

    const handleEdit = () => {
        history.push(`/posts/${postId}/edit`)
    }

    const handleDelete = (postId) => {
        dispatch(deletePostThunk(postId)).then(history.push(`/users/${user.id}/posts`))
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
              <Link key={comment.id} to={`/posts/${postId}/comments/${comment.id}`}>
                <p>{comment.body}</p>
              </Link>
            );
          });
        }
      };
      

  return (
    <div className='post-page-container'>
        <div>{user.username}</div>
        <div>{post.body}</div>
        <br></br>
        {showComments()}
        <div className='post-buttons-container'>
            <button onClick={handleEdit} className='post-edit-button'>Edit Post</button>
            <button onClick={() => handleDelete(postId)}className='post-delete-button'>Delete Post</button>
            <button onClick={addComment}className='add-comment-button'>Add A Comment</button>
        </div>
    </div>
  );
}

export default PostPage;