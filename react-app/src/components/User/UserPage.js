import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadUserPostsThunk } from '../../store/posts';
import { Link, useHistory, useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import './UserPage.css';

const UserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    console.log(user)
    const {userId} = useParams();
    // const userPosts = useSelector(state => state.posts)
    // console.log(userPosts, "!!!")
    const history = useHistory();

    // if (user) {
    //     history.push('/direct-messages')
    // }

    const handleClick = () => {
        history.push('/create-post')
    }

    const handleMyPosts = () => {
        history.push(`/users/${userId}/posts`)
    }

        return (
            <div>
                <NavBar />
                <h1 className='user-header'>{user.username}</h1>
                <button type='submit' className='my-posts-button' onClick={handleMyPosts}>
                    My Posts
                </button>
                <button type='submit' className='create-post-button' onClick={handleClick}>
                    +
                </button>
            </div>
        );
}

export default UserPage;