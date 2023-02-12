import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory()

    if (user) {
        history.push('/me')
    }

        return (
            <div>
                {/* <div className='bg-img-container'>
                    <img src="https://www.freepik.com/premium-vector/abstract-geometric-shapes-red-light-sport-dark-background_5401993.htm#from_view=detail_alsolike" alt='espn-inspired-image' className='bg-img'></img>
                </div> */}
                <div className='home-container'>
                    <h1 className='home-header'>TeamTrackr</h1>
                        <div className='home-buttons'>
                            <Link to='/login'>
                                <button className='home-login-button'>Login</button>
                            </Link>
                            <Link to='/sign-up'>
                                <button className='home-signup-button'>Signup</button>
                            </Link>
                        </div>
                    <div className='github-logo-container'>
                        <a href='https://github.com/kaynomic/TeamTrackr'>
                            <img className='github-logo' src='https://i.pinimg.com/originals/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.png' alt='github-logo'></img>
                        </a>
                    </div>
                    <div>
                        <h3 className='home-bottom'>Your new favorite sports app!</h3>
                    </div>
                </div>
            </div>
        );
}

export default HomePage;
