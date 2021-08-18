import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fsDb } from "../services/firebase"
import { Card } from 'antd';
import moment from 'moment';
const { Meta } = Card;

class HomePageCard extends React.Component {

  state = {
    user: ''
  }

  componentDidMount(){
    this.fetchUserInfo()
  }

  fetchUserInfo = () => {
    const userActivityInfo = this.props.activity.user_id
    const nameAndAge = fsDb
      .collection("user_profiles")
      .where("user_id", "==", userActivityInfo).get().then((info) => {
        this.setState({user: info.docs[0] ? info.docs[0].data() : null });
      });

  }

  renderCard = () => {
    const activity = this.props.activity;
    if(!this.state.user?.user_id) return null;
    console.log('returning card');
    return(
      <Link
        to={{
          pathname: "/PublicProfile",
          state: { userId: this.state.user?.user_id }
        }}
      >
        <Card hoverable style={{ width: 400 }}
          title= {
            this.state.user.name +
            ' | ' +
            moment(this.state.user?.DOB?.toDate()).toNow('Y')
          }
          cover={<img alt="example" src={this.state.user?.userImage}/>} >
          <Meta title={activity.title} description="" /> <br/>
            <h5>
              {
                activity.location.street_number +
                ', ' +
                activity.location.street +
                ', ' +
                activity.location.suburb +
                ' | '+
                moment(activity.time.toDate()).format('MMMM Do YYYY')
              }
            </h5>
        </Card>
      </Link>
    )
  }


  render() {
    return(
      <div>
        {this.renderCard()}
      </div>
    )
  }
}
export default HomePageCard;
