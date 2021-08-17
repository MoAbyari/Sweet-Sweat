import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ActivityCard from '../components/ActivityCard';
import PostActivity from './PostActivity';
import EditProfile from '../components/EditProfile';
import { getCurrentUser } from '../helpers/auth';



class Profile extends Component {
  render () {
    return (
      <div>
        <EditProfile />
        <Link to="/PostActivity">New Activity</Link>
        <ActivityCard userId={ getCurrentUser().uid }/>
      </div>
    )
  }
}
export default Profile;
