import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ActivityCard from '../components/ActivityCard';
import PostActivity from './PostActivity';
import EditProfile from '../components/EditProfile';


class Profile extends Component {
  render () {
    return (
      <div>
        <EditProfile />
        <Link to="/PostActivity">New Activity</Link>
        <ActivityCard />
      </div>
    )
  }
}
export default Profile;
