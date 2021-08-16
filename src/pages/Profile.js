import React from 'react';
import ActivityCard from '../components/ActivityCard';
import EditProfile from '../components/EditProfile';


class Profile extends React.Component {
  render () {
    return (
      <div>
        <EditProfile />
        <ActivityCard />
      </div>
    )
  }
}
export default Profile;
