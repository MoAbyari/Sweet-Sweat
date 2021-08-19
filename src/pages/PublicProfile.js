import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ActivityCard from '../components/ActivityCard';
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';
import { Card, Avatar  } from 'antd';
const { Meta } = Card;


class PublicProfile extends Component {

  renderProfileInfo =  () => {
    const state = this.props.location.state;
      return(
        <div>
          <Card
            style={{ width: 630 }}
            cover={<img alt="userpic" src={state.userImage} />}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title= { (<div> <h1> <strong> {state?.name} </strong> </h1>
              <h4> {state.DOB ? moment(state.DOB.toDate()).format('MMMM Do YYYY'): null} </h4> </div>)}
              description= {state?.aboutme}
            />
          </Card>
        </div>
      );
  }

  render () {

    return (
      <div>
        {this.renderProfileInfo()}
        <ActivityCard userId={ this.props.location.state?.userId }/>
      </div>
    )
  }
}
export default PublicProfile;
