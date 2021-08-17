import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ActivityCard from '../components/ActivityCard';
import { getCurrentUser } from '../helpers/auth';



class PublicProfile extends Component {
  render () {

    return (
      <div>
        <ActivityCard userId={ this.props.location.state?.userId }/>
      </div>
    )
  }
}
export default PublicProfile;
