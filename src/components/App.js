import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { auth } from '../services/firebase';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NavBar from './NavBar';


class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
  auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        authenticated: true,
        loading: false,
      });
    } else {
      this.setState({
        authenticated: false,
        loading: false,
      });
    }
  })
}

  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Router>
        <NavBar isLoggedIn={this.state.authenticated} />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateRoute>
          <PrivateRoute path="/profile" authenticated={this.state.authenticated} component={Profile}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
