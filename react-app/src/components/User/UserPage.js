import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { allPostsThunk } from '../../store/posts';
import NavBar from '../NavBar';
import './UserPage.css';

const UserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const posts = Object.values(useSelector(state => state.posts))
    // const {userId} = useParams();
    const history = useHistory();

    useEffect(() => {
        dispatch(allPostsThunk())
    }, [dispatch])


    const handleClick = () => {
        history.push('/create-post')
    }

    if (!posts) {
        return <div>Loading...</div>
    } else if (!Object.values(posts).length) {
            return (<div >
                        <h1 className='no-posts-in-your-feed'>Loading...</h1>
                    </div>)
    } else {
        return (
            user && posts ?
            <div>
                <NavBar />
                <div className='user-side'>
                    <div className='name-img'>
                        <h1 className='user-header'>{user.username}</h1>
                        <img src={user.image} className="user-img" alt='demo'></img>
                    </div>
                    <div className='post-button-container'>
                        <button type='submit' className='create-post-button' onClick={handleClick}>
                        Create New Post
                        </button>
                    </div>
                </div>
                <div className='user-feed'>
                    {posts.length && posts.map((post, i) => {                       
                        if (post && post.user) {
                            return (
                                <div className='feed-container'>
                                    <div className='feed-post-container' key={i}>
                                        <div className='feed-post-user'>{post.user.username}</div>
                                    {/* <div className='feed-post-user-img'>
                                    <img src={post.user.image}></img>
                                    </div> */}
                                    <div className='feed-post-body'>{post.body}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            :
            <div>null</div>
        );
    }
}

export default UserPage;