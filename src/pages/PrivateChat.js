import React, { Component } from 'react';
// import { fsDb } from "../services/firebase"
// import { auth } from "../services/firebase";
// import { getCurrentUser } from '../helpers/auth';
// import moment from 'moment';


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
  }

  renderMessages = () => {
    const messages = this.props.location.state.chats;
    this.setState({messages: messages})
  }

//
//   fetchChats = () => {
//   fsDb
//     .collection("chats")
//     .where("participants", "array-contains", getCurrentUser().uid)
//     .get()
//     .then((snapshots) => {
//       let chats = [];
//       snapshots.forEach((chat) => {
//         chats.push(chat.data());
//       });
//     this.setState({chats: chats});
//   });
// }

handleChange = (event) => {
  this.setState({content: event.target.value});
}


  render () {
    return (
      <div>
        <div className="messages">
          {this.state.messages.map(message => {
            return <p key={message.timestamp}>{message.message}</p>
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <textarea type="text" onChange={this.handleChange} value={this.state.content} />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}
export default PrivateChat;
