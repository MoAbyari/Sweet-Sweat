import React, { Component } from 'react';
import {Link} from "react-router-dom";
import ActivityCard from '../components/ActivityCard';
import { Button } from 'antd';
import moment from 'moment';
import { Card  } from 'antd';
const { Meta } = Card;


class PublicProfile extends Component {

  renderProfileInfo =  () => {
    const state = this.props.location.state;
      return(
        <div>
          <Card
            cover={<img alt="userpic" src={state.userImage || "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
          >
            <Meta
              title= {(
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <h1> <strong> {state?.name} </strong> </h1>
                    <h4> {(state.DOB && state.DOB.toDate) ? moment(state.DOB.toDate()).format('MMMM Do YYYY') : null} </h4>
                  </div>
                  <div>
                    <Link to="/PrivateChat">
                      <Button type="primary">Send Message</Button>
                    </Link>
                  </div>
                </div>
              )}
              description={state?.aboutme}
            />
          </Card>
        </div>
      );
  }

  render () {

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {this.renderProfileInfo()}
        <ActivityCard userId={ this.props.location.state?.userId }/>
      </div>
    )
  }
}
export default PublicProfile;
