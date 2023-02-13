import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import { authenticate } from './store/session';
import FourOFour from './components/404';
import HomePage from './components/HomePage';
import UserPage from './components/User/UserPage';
import CreatePostForm from './components/post/Create/CreatePostForm';
import EditPostForm from './components/post/Edit/EditPostForm';
import PostPage from './components/post/Read/PostPage';
import UserPosts from './components/post/Read/UserPosts';
import CreateCommentForm from './components/comment/Create/CreateCommentForm';
import CommentPage from './components/comment/Read/CommentPage';
import EditCommentForm from './components/comment/Edit/EditCommentForm';
import TeamsPage from './components/teams/TeamsPage';

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
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/me' exact={true} >
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/teams' exact={true} >
          <NavBar />
          <TeamsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/posts' exact={true} >
          <NavBar />
          <UserPosts />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <NavBar />
          <PostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/create-post' exact={true} >
          <NavBar />
          <CreatePostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <EditPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/comments/create' exact={true} >
          <CreateCommentForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/comments/:commentId' exact={true} >
          <CommentPage />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/comments/:commentId/edit' exact={true} >
          <EditCommentForm />
        </ProtectedRoute>
        <Route component={FourOFour}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
