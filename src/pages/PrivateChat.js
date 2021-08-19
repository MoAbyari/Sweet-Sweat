import React, { Component } from 'react';
// import { fsDb } from "../services/firebase"
// import { auth } from "../services/firebase";
// import { getCurrentUser } from '../helpers/auth';
// import moment from 'moment';
import { Button } from 'antd';

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
    const messages = this.props.location?.state?.chats;
    this.setState({messages: messages})
  }


handleChange = (event) => {
  this.setState({ content: event.target.value });
}

handleSubmit = () => {
  alert('To be implemented!')
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
