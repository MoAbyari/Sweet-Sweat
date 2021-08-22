import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { auth } from "../services/firebase";
import { withRouter } from "react-router";
import { signOut } from '../helpers/auth';
import { Menu } from 'antd';

class NavBar extends Component {

  handleLogOut = () => {
    signOut().then(() => {
      window.location.href= '/login';
    })
  }

render(){

  if (this.props.isLoggedIn){
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} key={this.props.isLoggedIn} >
        <Menu.Item key="home">
           <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/Profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="messages">
          <Link to="/Chat">Messages</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={this.handleLogOut}> Logout </a>
        </Menu.Item>
        <Menu.Item key="logeedIn">
          <strong>{ auth().currentUser?.email}</strong>
        </Menu.Item>
      </Menu>
    );
  } else{
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
        <Menu.Item key="2">
          <Link to="/signup"> Signup </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/login"> Login </Link>
        </Menu.Item>
      </Menu>
    );
  }
}


}

export default withRouter(NavBar);
