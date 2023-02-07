import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import FourOFour from './components/404';
import HomePage from './components/HomePage';
import UserPage from './components/User/UserPage';
import CreatePostForm from './components/post/Create/CreatePostForm';
import EditPostForm from './components/post/Edit/EditPostForm';
import PostPage from './components/post/Read/PostPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
      <Route path='/' exact={true} >
          <NavBar />
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/me' exact={true} >
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <PostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/create' exact={true} >
          <CreatePostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <EditPostForm />
        </ProtectedRoute>
        <Route component={FourOFour}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
