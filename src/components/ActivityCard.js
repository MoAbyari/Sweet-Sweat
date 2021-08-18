import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fsDb } from "../services/firebase"
import moment from 'moment';
import { getCurrentUser } from '../helpers/auth';

import { Card } from 'antd';
import './ActivityCard.css';
import EditActivity from './EditActivity';
import DeleteActivity from './DeleteActivity';


class ActivityCard extends Component {
  constructor() {
    super();
    this.state = {
      activities: []
    }
  }

  componentDidMount() {
    fsDb
      .collection('activities')
      .where('user_id', '==', this.props.userId) // userId is passed into Activitycard from parent, which in this case is profile or PublicProfile page
      .get()
      .then((snapshots) => {
        let activities = [];
        snapshots.forEach((activity) => {
          const docId = activity.id;
          const activityObj = activity.data();
          activities.push({ ...activityObj, docId });
        });
      this.setState({activities: activities});
      });
    }

    renderActivities = () => {
      const activities = this.state.activities;
      if (this.props.userId === getCurrentUser().uid) {
        return activities.map((activity, index) => {
          return (
            <div key={index} className="site-card-border-less-wrapper">
              <EditActivity documentId={activity.docId} documentInfo={activity} />
              <DeleteActivity documentId={activity.docId} />
              <Card
                title={activity.title}
                bordered={false} style={{ width: 600 }}>
                <p>{activity.description}</p>
                <p>
                  {
                  activity.location.street_number + ', '
                  + activity.location.street + ', '
                  + activity.location.suburb
                  }
                </p>
                <p>{moment(activity.time.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </Card>
            </div>
          );
        });
      } else {
        return activities.map((activity, index) => {
          return (
            <div key={index} className="site-card-border-less-wrapper">
              <Card
                title={activity.title}
                bordered={false} style={{ width: 600 }}>
                <p>{activity.description}</p>
                <p>
                  {
                  activity.location.street_number + ', '
                  + activity.location.street + ', '
                  + activity.location.suburb
                  }
                </p>
                <p>{moment(activity.time.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </Card>
            </div>
          );
        });
      }
    }

  render() {
    return (
      <div>
        {this.renderActivities()}
      </div>
    );
  }
}


export default ActivityCard;
