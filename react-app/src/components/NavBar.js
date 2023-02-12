
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
    <nav className='navbar'>
      <ul className='navlinks'>
        <li>
          <NavLink to={`/me`} exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user.id}/posts`} exact={true} activeClassName='active'>
            My Posts
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${user.id}/teams`} exact={true} activeClassName='active'>
            My Teams
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li className='logout-button-container'>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
