import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { allPostsThunk } from '../../../store/posts';

function UserPosts() {

    const user = useSelector(state => state.session.user);
    const post = useSelector(state => state.posts)
    // const {userId} = useParams();
    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        dispatch(allPostsThunk())
    }, [dispatch])

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

export default UserPosts;