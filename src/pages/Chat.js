import React, { Component } from 'react';
import { auth } from "../services/firebase";
import { fsDb } from "../services/firebase";
import { getCurrentUser } from '../helpers/auth';


import { Card } from 'antd';
import '../components/ActivityCard.css';
import moment from 'moment';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
    };
  }

  componentDidMount() {
    this.fetchChats();
  }

  ///////////////////////////////// fetch activities from database /////////////////
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

  renderChats = () => {
    const chats = this.state.chats;
    if (this.state.user.uid === getCurrentUser().uid) {
      return chats.map((chat, index) => {
        return (
          <div>
            <Card
              title="Messages"
              bordered={false} style={{ width: 600 }}>
              <p>
                {chat.participants[1]}
              </p>
              
            </Card>
          </div>
        );
      });
    }
  }

  // handleChange = (event) => {
  //   this.setState({
  //     content: event.target.value
  //   });
  // }
  //
  // handleSubmit = async(event) => {
  //   event.preventDefault();
  //   this.setState({ writeError: null });
  //   try {
  //     await db.ref("chats").push({
  //       content: this.state.content,
  //       timestamp: Date.now(),
  //       uid: this.state.user.uid
  //     });
  //     this.setState({ content: '' });
  //   } catch (error) {
  //     this.setState({ writeError: error.message });
  //   }
  // }

  render () {
    return (
      <div>
        { this.renderChats() }
      </div>
    );
  }
}
export default Chat;
