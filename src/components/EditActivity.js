import React, {Component} from 'react';
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';


class EditActivity extends Component {
  constructor(props){
    super(props);
    this.state = {
      showForm: false,
      // states below get their values from EditActivity props defined in ActivityCard component
      // this has been done to show the previous info in any fields (e.g. description content)
      title: props?.documentInfo?.title,
      type: props?.documentInfo?.type,
      time: null,
      location:
        {
          street_number: props?.documentInfo?.location.street_number,
          street: props?.documentInfo?.location.street,
          suburb: props?.documentInfo?.location.suburb
        },
      description: props?.documentInfo?.description
    }
  }

///////////////////////  Set and update user info to Db ////////////////////////
updateActivity = (data) => {
  return fsDb.collection("activities")
  .doc(this.props.documentId)
  .set({
    title: data.title,
    type: data.type,
    time: data.time,
    location: {
      street: data.location.street,
      street_number: data.location.street_number,
      suburb: data.location.suburb
    },
    description: data.description
  }, {merge: true})
  .then(() => {console.log("Activity successfully created!");})
}

_handleSubmit = (event) => {
  event.preventDefault();
  this.setState({showForm:false});
  this.updateActivity(this.state).then(() => {
    this.props.updateActivity();
  })
}

///////////////////////////////  Form  eventHandler ///////////////////////////////
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

////////////////////////////////////  Form Show  //////////////////////////////////
  showForm = () => {
    return(
      <div>
        <form onSubmit={ this._handleSubmit }>
          Title:
          <input
            type="text"
            placeholder="5k morning run"
            style={{ width: '40%' }}
            onChange={ this.renderTitle }
            value={this.state.title}
            required
          />
          Type:
          <input
            type="text"
            placeholder="Running"
            style={{ width: '40%' }}
            onChange={ this.renderType }
            value={this.state.type}
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
            value={this.state.location.street_number}
            required
          />
          <input
            type="text"
            placeholder="Street name"
            style={{ width: '30%' }}
            onChange={ this.renderStreetName }
            value={this.state.location.street}
            required
          />
          <input
            type="text"
            placeholder="SUBURB"
            style={{ width: '30%' }}
            onChange={ this.renderSuburb }
            value={this.state.location.suburb}
            required
          />
          Description:
          <textarea
            type="text"
            placeholder="Please provide a brief info about this activity"
            onChange={ this.renderDescription }
            value={this.state.description}
            required
          />
          <input type="submit" value="Update" />
        </form>
        <input type="submit" value= "Cancel" onClick={() => this.setState({showForm: false}) }/>
      </div>
    )
  }

/////////////////////////////////   Render Form ////////////////////////////////
  render() {
    return(
      <div>
        <button onClick={() => this.setState({showForm: true}) }>
          Edit Activity
        </button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    );
  }
}


export default EditActivity;
