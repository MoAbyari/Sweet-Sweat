import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { auth } from "../services/firebase";
import { withRouter } from "react-router";
import { signOut } from '../helpers/auth';

class NavBar extends Component {
  constructor() {
  super();
    this.state = {
      user: auth().currentUser
    }
  }

  handleLogOut = () => {
    console.log(this.props.history);

    signOut().then(() => {
      this.props.history.push('/login');

    })
  }

render(){
  if (this.props.isLoggedIn){
    return (
      <nav className ="nav">
        <Link to="/">Home |</Link>
        <Link to="/Profile"> Profile |</Link>
        <Link to="/Chat"> Messages |</Link>
        <a onClick={this.handleLogOut}> Logout </a>
        Logged in as: <strong>{this.state?.user?.email}</strong>
      </nav>
    );
  } else{
    return (
      <nav className ="nav">
        <Link to="/signup"> Signup |</Link>
        <Link to="/login"> Login </Link>
      </nav>
    );
  }
}


}

export default withRouter(NavBar);
