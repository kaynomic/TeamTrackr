import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { allPostsThunk } from '../../store/posts';
import NavBar from '../NavBar';
import './UserPage.css';

const UserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const posts = Object.values(useSelector(state => state.posts))
    console.log(posts)
    // console.log(user)
    // const {userId} = useParams();
    // const userPosts = useSelector(state => state.posts)
    // console.log(userPosts, "!!!")
    const history = useHistory();

    // if (user) {
    //     history.push('/direct-messages')
    // }

    const userFeed = () => {
        return posts.map(post => {
            return (
                <div className='feed-container'>
                    <div className='feed-post-container'>
                        <div className='feed-post-user'>{post.user ? post.user.username : null}</div>
                        {/* <div className='feed-post-user-img'>
                            <img src={post.user.image}></img>
                        </div> */}
                        <div className='feed-post-body'>{post.body}</div>
                    </div>
                </div>
            )
        })
    }

    useEffect(() => {
        dispatch(allPostsThunk())
    }, [dispatch])

    const handleClick = () => {
        history.push('/create-post')
    }

    if (!user) {
        return null
    } else {
        return (
            <div>
                <NavBar />
                <div className='user-side'>
                    <div className='name-img'>
                        <h1 className='user-header'>{user.username}</h1>
                        <img src={user.image} className="user-img"></img>
                    </div>
                    <div className='post-button-container'>
                        <button type='submit' className='create-post-button' onClick={handleClick}>
                        Create New Post
                        </button>
                    </div>
                </div>
                <div className='user-feed'>
                    {userFeed()}
                </div>
            </div>
        );
    }
}

export default UserPage;