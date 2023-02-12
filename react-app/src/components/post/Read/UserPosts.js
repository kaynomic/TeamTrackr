import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadUserPostsThunk } from '../../../store/posts';
import { authenticate } from '../../../store/session';
import './UserPosts.css';

function UserPosts() {

    const user = useSelector(state => state.session.user);
    // const post = useSelector(state => state.posts)
    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authenticate())
      dispatch(loadUserPostsThunk(userId))
    }, [dispatch, userId])

    if (!user) {
      return null
    } else {
    return (
      <div className='post-container'>
          {user.posts.map((post, i) => {
              return (
                <Link to={`/posts/${post.id}`}  key={i} className="user-post">  {post.body}
                <br></br>
                </Link>
                )
          })}
      </div>
    );
  }
}

export default UserPosts;