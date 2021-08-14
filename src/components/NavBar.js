import React, {Component} from 'react'
import {Link} from "react-router-dom";
import { signOut } from '../helpers/auth';
class NavBar extends Component{

  handleLogOut = () => {
    signOut()
  }

render(){

  if (this.props.isLoggedIn){
    return (
      <nav className ="nav">
        <Link to="/">Home |</Link>
        <Link to="/profile"> Profile |</Link>
        <Link to="/Chat"> Messages </Link>
        <button onClick={this.handleLogOut} > Logout </button>
      </nav>
    );
  } else{
    return (
      <nav className ="nav">
        <Link to="/">Home |</Link>
        <Link to="/signup"> Signup |</Link>
        <Link to="/login"> Login </Link>
      </nav>
    );
  }
}


}

export default NavBar;
