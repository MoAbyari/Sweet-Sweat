import React, { Component } from 'react';

class PostActivity extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: null,
    }
  }

  handleChange = (event) => {
    this.setState({titleInput: event.target.value});
  }

  render () {
    return (
      <div>
        <form>
          <input
          type="text"
          placeholder="5k morning run"
          style={{ width: 300 }} 
          onChange={this.handleChange} />
          <input type="submit" value="Create activity" />
        </form>
      </div>
    )
  }
}
export default PostActivity;
