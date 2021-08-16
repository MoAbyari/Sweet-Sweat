import React, { Component } from 'react';
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
        this.setState({user: info.docs[0].data()});
      });

  }

  renderCard = () => {
    const activity = this.props.activity

    return(
      <Card hoverable style={{ width: 400 }}
        title= {
          activity.location.street_number +
          ', ' +
          activity.location.street +
          ', ' +
          activity.location.suburb
        }
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />} >
        <Meta title={activity.title} description="hi" />
        <p>{moment(activity.time.toDate()).format('MMMM Do YYYY')} </p>
        <p> {this.state.user.name}</p>
        <p> {moment(this.state.user?.DOB?.toDate()).format('MMMM Do YYYY')}</p>
      </Card>
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
