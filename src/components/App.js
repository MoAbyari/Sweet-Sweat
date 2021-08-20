import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import PublicProfile from '../pages/PublicProfile';
import PostActivity from '../pages/PostActivity';
import PrivateChat from '../pages/PrivateChat';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { auth } from '../services/firebase';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import NavBar from './NavBar';
import { Layout } from 'antd';

const { Content, Header } = Layout;


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
      <Layout>
        <Router>
          <NavBar isLoggedIn={this.state.authenticated} />
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Switch>
                <PrivateRoute exact path="/" component={Home} authenticated={this.state.authenticated} ></PrivateRoute>
                <PrivateRoute path="/chat" authenticated={this.state.authenticated}
                component={Chat}></PrivateRoute>
                <PrivateRoute path="/profile" authenticated={this.state.authenticated} component={Profile}></PrivateRoute>
                <PrivateRoute path="/PublicProfile" authenticated={this.state.authenticated} component={PublicProfile}></PrivateRoute>
                <PrivateRoute path="/PostActivity" authenticated={this.state.authenticated} component={PostActivity}></PrivateRoute>
                <PrivateRoute path="/PrivateChat" authenticated={this.state.authenticated} component={PrivateChat}></PrivateRoute>
                <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
                <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
              </Switch>
            </div>
          </Content>
        </Router>
      </Layout>
    );
  }
}

export default App;
