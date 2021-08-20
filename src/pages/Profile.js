import React, { Component } from 'react';
import ActivityCard from '../components/ActivityCard';
import PostActivity from './PostActivity';
import EditProfile from '../components/EditProfile';
import { getCurrentUser } from '../helpers/auth';



class Profile extends Component {
  render () {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <EditProfile />
        <ActivityCard userId={ getCurrentUser().uid }/>
      </div>
    )
  }
}
export default Profile;
