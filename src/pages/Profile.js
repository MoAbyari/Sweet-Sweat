import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ActivityCard from '../components/ActivityCard';
import PostActivity from './PostActivity';


class Profile extends Component {
  render () {
    return (
      <div>
        <Link to="/PostActivity">New Activity</Link>
        <ActivityCard />
      </div>
    )
  }
}
export default Profile;
