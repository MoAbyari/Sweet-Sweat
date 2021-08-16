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
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { auth } from '../services/firebase';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NavBar from './NavBar';
import { Layout, Menu } from 'antd';

const {Content} = Layout;


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

    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
        </Switch>
      </div>
    </Content>
      </Router>
    );
  }
}

export default App;
