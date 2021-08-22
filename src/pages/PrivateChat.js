import React, { Component } from 'react';
import { fsDb } from "../services/firebase"
import firebase from 'firebase';
import { Button } from 'antd';
import { getCurrentUser } from '../helpers/auth';

class PrivateChat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      content: '',
    };
  }

  componentDidMount() {
    this.renderMessages();
    const chatId = this.props.location.state.chatId;
    fsDb.collection("chats").doc(chatId).onSnapshot((doc) => {
      this.setState({messages: doc.data()?.messages})
    })
  }

  renderMessages = () => {
    const messages = this.props.location?.state?.chats;
    this.setState({messages: messages})
  }


handleChange = (event) => {
  this.setState({ content: event.target.value });
}


handleSubmit = async() => {
  const chats = fsDb.collection("chats").doc(this.props.location.state.chatId);
  const newMessage = { 
    message: this.state.content,
    timestamp: new Date(),
    uid: getCurrentUser().uid,
  }

  await chats.update({
    messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
  });
    
  this.setState({ content: '' });
}

  render () {
    return (
      <div>
        <div className="messages">
          {this.state?.messages?.map(message => {
            return <p key={message.timestamp}>{message.message}</p>
          })}
        </div>
        <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea type="text" onChange={this.handleChange} value={this.state.content} />
          <Button onClick={this.handleSubmit} type="primary" style={{ maxWidth: '200px', marginTop: '20px' }} >
            Send
          </Button>
        </form>
      </div>
    );
  }
}
export default PrivateChat;
