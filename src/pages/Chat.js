import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { fsDb } from "../services/firebase";
import { uniq, findWhere } from "underscore";
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';
import { isEmpty } from 'underscore';
import { Card, Divider } from 'antd';
import '../components/ActivityCard.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      userProfiles: [],
    };
  }

  componentDidMount() {
    this.fetchChats();
  }

  ///////////////////////////////// fetch chats from database /////////////////
  fetchChats = () => {
    // 1/ get all chats
    // 2/ get user_profiles for all the chat's participants
    // 3/ set the state for {chats, participants}
    // 4/ render chats and when the participant is needed, look it up in this.state.participant
    fsDb
      .collection("chats")
      .where("participants", "array-contains", getCurrentUser().uid)
      .get()
      .then((snapshots) => {
        let chats = [];
        snapshots.forEach((snap) => {
          const docId = snap.id;
          const chatObj = snap.data();
          chats.push({...chatObj, docId});
        });

        let allParticipantsId = []
        chats.map((chat) => {  // this will give you all participants Id's with your id reapeted
          allParticipantsId = [...allParticipantsId, ...chat.participants]
        })

        const participantsId = uniq(allParticipantsId); // this line uses uniq from underscore to get rid of duplicated id's
        this.getAllUsersInfos(participantsId || []).then((userProfile) => {
          this.setState({chats: chats, userProfiles: userProfile});
        });

    });
  }

  ///////////////////////////////// fetch user's info from database /////////////////
  getAllUsersInfos = async (allParticipants) => {
    if (isEmpty(allParticipants)) return;
    const snapshots = await fsDb
    .collection("user_profiles")
    .where("user_id", "in", allParticipants || [])
    .get()

    let userInfos = [];
    snapshots.forEach((snapshot) => {
      userInfos.push(snapshot.data());
    });
    // console.log('>>>', userInfos);
    return userInfos;
  }

  ///////////////////////////////// render user's image from db based on the userID that recieves as argument /////////////////
  renderParticipant = (userId) => {
    const userProfile = findWhere(this.state.userProfiles, {user_id: userId});
    console.log('userId',userId,userProfile );

    return userProfile?.userImage ? <img alt="userpic" src={userProfile.userImage}
      width="100" style={{borderRadius: "50%"}} /> : 'no image :(';
  }

  ///////////////////////////////// render all chats /////////////////////////////////
  renderChats = () => {
    const chats = this.state.chats;
      return chats.map((chat, index) => {
        return (
          <div key={ index }>
            <Link
              to={{
                pathname: "/PrivateChat",
                state: {
                  chats: chat.messages,
                  chatId: chat.docId,
                }
              }}
            >
              <Card
                bordered={false} style={{ width: 600 }}>
                <div>
                  {this.renderParticipant(chat.participants[1])}
                </div>
                <p>
                  {chat.messages ? moment(chat.messages[chat.messages.length - 1]?.timestamp?.toDate())
                  .format('MMMM Do YYYY, h:mm:ss a') : 'no date'}
                </p>
              </Card>
            </Link>
          </div>
        );
      });
  }

  render () {
    return (
      <div>
        <h1>Messages</h1>
        <Divider />
        {(isEmpty(this.state.chats)) ? "You have no messages yet." : this.renderChats()}
      </div>
    )
  }
}
export default Chat;
