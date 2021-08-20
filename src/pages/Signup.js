import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import { signin, signInWithGoogle } from "../helpers/auth";
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import { Input, Typography, Button } from 'antd';

const { Text } = Typography;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: '',
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
      await fsDb.collection("user_profiles").doc().set({ name: '', user_id: getCurrentUser().uid});
      await fsDb.collection("users").doc().set({ name: '', email: this.state.email, user_id: getCurrentUser().uid})
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  googleSignIn = async() => {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1>
            Sign Up to {' '}
          <Link to="/">Sweet&Sweat</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <Input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email} />
          </div>
          <div>
            <Input placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password" style={{ margin: '20px 0' }} />
          </div>
          <div>
            {this.state.error ? <Text style={{ display: 'block' }} type="danger">{this.state.error}</Text> : null}
            <button type="submit">Sign up</button>
            <p>Or</p>
            <button onClick={this.googleSignIn} type="button">
              Sign up with Google
            </button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    )
  }
}
export default Signup;
