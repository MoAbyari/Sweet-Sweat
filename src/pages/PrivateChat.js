import React, { Component } from 'react';
import { fsDb } from "../services/firebase"
import { auth } from "../services/firebase";
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';


class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: ''
    };
  }

  componentDidMount(){
      fsDb.collection("chats").where("participants", "array-contains", "wzWiTGtNUPbjWsPZxmYeRk9W0bY2").get().then((snapshots) => {
        let chats = [];
        snapshots.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
  }

  fetchChats = () => {
  fsDb
    .collection("chats")
    .where("participants", "array-contains", getCurrentUser().uid)
    .get()
    .then((snapshots) => {
      let chats = [];
      snapshots.forEach((chat) => {
        chats.push(chat.data());
      });
    this.setState({chats: chats});
  });
}


  render () {
    return (
      <div>
        Hi 
      </div>
    )
  }
}
export default PrivateChat;
