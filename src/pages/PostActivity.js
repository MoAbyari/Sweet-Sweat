import React, { Component } from 'react';
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';


class PostActivity extends Component {
  constructor() {
    super();
    this.state = {
      title: null,
      type: null,
      time: null,
      location: {street_number: null, street: null, suburb: null},
      description: null
    }
  }
////////////////// create activity and save on db (firestore) //////////////////
  saveActivity = (data) => {
    fsDb.collection("activities")
    .doc()
    .set({
      title: data.title,
      type: data.type,
      time: data.time,
      location: {
        street: data.location.street,
        street_number: data.location.street_number,
        suburb: data.location.suburb
      },
      description: data.description,
      user_id: getCurrentUser().uid
    })
    .then(() => {console.log("Activity successfully created!");})
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    this.saveActivity(this.state);
    this.props.history.push('/Profile'); // redirects to Profile page after creating the activity
  }

  ////////////////// renders all input fields in the state //////////////////
  renderTitle = (event) => {
    this.setState({title: event.target.value});
  }
  renderType = (event) => {
    this.setState({type: event.target.value});
  }
  renderTime = (event) => {
    this.setState({time: moment(event.target.value).toDate()});
  }
  renderStreetNumber = (event) => {
    this.setState({location: {...this.state.location, street_number: parseInt(event.target.value)}});
  }
  renderStreetName = (event) => {
    this.setState({location: {...this.state.location, street: event.target.value}});
  }
  renderSuburb = (event) => {
    this.setState({location: {...this.state.location, suburb: event.target.value}});
  }
  renderDescription = (event) => {
    this.setState({description: event.target.value});
  }
////////////////////////////////// the form //////////////////////////////////
  render () {
    return (
      <div>
        <form onSubmit={ this._handleSubmit }>
          Title:
          <input
            type="text"
            placeholder="5k morning run"
            style={{ width: '40%' }}
            onChange={ this.renderTitle }
            required
          />
          Type:
          <input
            type="text"
            placeholder="Running"
            style={{ width: '40%' }}
            onChange={ this.renderType }
            required
          />
          Time:
          <input
            type="date"
            style={{ width: '40%' }}
            onChange={ this.renderTime }
            required
          />
          Location:
          <input
            type="number"
            placeholder="Street number"
            style={{ width: '30%' }}
            onChange={ this.renderStreetNumber }
            required
          />
          <input
            type="text"
            placeholder="Street name"
            style={{ width: '30%' }}
            onChange={ this.renderStreetName }
            required
          />
          <input
            type="text"
            placeholder="SUBURB"
            style={{ width: '30%' }}
            onChange={ this.renderSuburb }
            required
          />
          Description:
          <textarea
            type="text"
            placeholder="Please provide a brief info about this activity"
            onChange={ this.renderDescription }
            required
          />
          <input type="submit" value="Create activity" />
        </form>
      </div>
    )
  }
}
export default PostActivity;
