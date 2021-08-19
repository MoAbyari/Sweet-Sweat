import React, { Component } from 'react';
import { fsDb } from "../services/firebase";
import { uniq, findWhere } from "underscore";
import { getCurrentUser } from '../helpers/auth';

class Chat extends React.Component {
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
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });

        let allParticipantsId = []
        chats.map((chat) => {
          allParticipantsId = [...allParticipantsId, ...chat.participants]
        })

        const participantsId = uniq(allParticipantsId);
        this.getAllUsersInfos(participantsId).then((userProfile) => {
          this.setState({chats: chats, userProfiles: userProfile});
        });

    });
  }

  ///////////////////////////////// fetch user's info from database /////////////////
  getAllUsersInfos = async (allParticipants) => {
    const snapshots = await fsDb
    .collection("user_profiles")
    .where("user_id", "in", allParticipants)
    .get()

    let userInfos = [];
    snapshots.forEach((snapshot) => {
      userInfos.push(snapshot.data());
    });
    console.log('>>>', userInfos);
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
            <Card
              title="Messages"
              bordered={false} style={{ width: 600 }}>
              <div>
                {this.renderParticipant(chat.participants[1])}
              </div>
              <p>
                {chat.messages ? moment(chat.messages[chat.messages.length - 1].timestamp?.toDate())
                .format('MMMM Do YYYY, h:mm:ss a') : 'no date'}
              </p>
            </Card>
          </div>
        );
      });
  }

  render () {
    return (
      <div>
        <div className="chats">
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp}>{chat.content}</p>
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.content}></input>
          {this.state.error ? <p>{this.state.writeError}</p> : null}
          <button type="submit">Send</button>
        </form>
        <div>
          Login in as: <strong>{this.state.user.email}</strong>
        </div>
      </div>
    )
  }
}
export default Chat;
