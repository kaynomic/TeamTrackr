import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import './UserPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { loadUserPostsThunk } from '../../store/posts';
import { Link, useHistory } from 'react-router-dom';
// import LogoutButton from '../auth/LogoutButton';
import NavBar from '../NavBar';
import './UserPage.css';

const UserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log(user)
    const userPosts = useSelector(state => state.posts)
    console.log(userPosts, "!!!")
    const history = useHistory();

    // if (user) {
    //     history.push('/direct-messages')
    // }

    const handleClick = () => {
        history.push('/posts/create')
    }

    const handleMyPosts = () => {
        history.push('/posts')
    }

    // useEffect(() => {
    //     dispatch(loadUserPostsThunk(user.id))
    // }, [dispatch, user.id])

        return (
            <div>
                <NavBar />
                <h1 className='user-header'>{user.username}</h1>
                <div className='post-container'>
                {user.posts.map((post, i) => {
                    return (
                    <Link to={`/posts/${post.id}`} key={i} className="user-post">{post.body}
                    <br></br>
                    </Link>
                    )
                })}
                </div>
                <button type='submit' className='m y-posts-button' onClick={handleMyPosts}>
                    My Posts
                </button>
                <button type='submit' className='create-post-button' onClick={handleClick}>
                    +
                </button>
            </div>
        );
}

export default UserPage;