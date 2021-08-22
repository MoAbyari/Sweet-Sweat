import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { fsDb } from "../services/firebase";
import { getCurrentUser } from '../helpers/auth';
import ActivityCard from '../components/ActivityCard';

import { Button } from 'antd';
import moment from 'moment';
import { Card  } from 'antd';
const { Meta } = Card;


class PublicProfile extends Component {
  constructor() {
    super();
    this.state = {
      existingChat: []
    }
  }

  fetchChats = () => {
    fsDb
      .collection("chats")
      .where("participants", "array-contains", getCurrentUser().uid)
      .get()
      .then((snapshots) => {
        let chats = [];
        snapshots.forEach((snap) => {
          chats.push(snap.data());
          console.log(">>>>>>", chats);
        })

        const publicUserChat = chats.filter((chat) => {
          return chat.participants.includes(this.props.location.state?.userId)
        })
        console.log("this >>>>", publicUserChat);
      })

  }

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
                    <Link to={{ pathname: '/PrivateChat', state: { chatId: '1' } }}>
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
    this.fetchChats();
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {this.renderProfileInfo()}
        <ActivityCard userId={ this.props.location.state?.userId }/>
      </div>
    )
  }
}
export default PublicProfile;
