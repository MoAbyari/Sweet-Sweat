import React, { Component } from 'react';
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';


import { Card } from 'antd';
import './ActivityCard.css';


class ActivityCard extends Component {
  constructor() {
    super();
    this.state = {
      activities: []
    }
  }

  componentDidMount() {
    // const userId = this.props.location.state.param.userId;
    const user = getCurrentUser();
    fsDb
      .collection('activities')
      .where('user_id', '==', user.uid)
      .get()
      .then((snapshots) => {
        snapshots.forEach((activity) => {
          // 3. actiivties == user_profiles to be loaded
          console.log('>>>', activity.data());
        });
      });
    }

  render() {
    return (
      <div>
        <div className="site-card-border-less-wrapper">
          <Card title="Activity title" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          </Card>
        </div>
      </div>
    );
  }
}

export default ActivityCard;
