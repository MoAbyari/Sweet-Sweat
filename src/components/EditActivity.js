import React, {Component} from 'react';
import { fsDb } from "../services/firebase"
import moment from 'moment';
import { Button, Input, Typography } from 'antd';


const { TextArea } = Input;
const { Text } = Typography;


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

_handleSubmit = () => {
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
      <div style={{ marginTop: '20px' }}>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <Text>Title:</Text>
          <Input
            type="text"
            placeholder="5k morning run"
            style={{ width: '40%', marginBottom: '20px' }}
            onChange={ this.renderTitle }
            value={this.state.title}
            required
          />
          <Text>Type:</Text>
          <Input
            type="text"
            placeholder="Running"
            style={{ width: '40%', marginBottom: '20px' }}
            onChange={ this.renderType }
            value={this.state.type}
            required
          />
          <Text>Time:</Text>
          <Input
            type="date"
            style={{ width: '40%', marginBottom: '20px' }}
            onChange={ this.renderTime }
            required
          />
          <Text>Location:</Text>
          <Input
            type="number"
            placeholder="Street number"
            style={{ width: '30%', marginBottom: '20px' }}
            onChange={ this.renderStreetNumber }
            value={this.state.location.street_number}
            required
          />
          <Input
            type="text"
            placeholder="Street name"
            style={{ width: '30%', marginBottom: '20px' }}
            onChange={ this.renderStreetName }
            value={this.state.location.street}
            required
          />
          <Input
            type="text"
            placeholder="SUBURB"
            style={{ width: '30%', marginBottom: '20px' }}
            onChange={ this.renderSuburb }
            value={this.state.location.suburb}
            required
          />
          <Text>Description:</Text>
          <TextArea
            type="text"
            placeholder="Please provide a brief info about this activity"
            onChange={ this.renderDescription }
            value={this.state.description}
            required
            style={{ marginBottom: '20px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ marginRight: '10px' }} type="primary" onClick={this._handleSubmit}>Update</Button>
            <Button onClick={() => this.setState({ showForm: false })}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }

/////////////////////////////////   Render Form ////////////////////////////////
  render() {
    return(
      <div style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => this.setState({showForm: true}) }
        >
          Edit Activity
        </Button>
        {this.state.showForm ? this.showForm() : null}
      </div>
    );
  }
}


export default EditActivity;
