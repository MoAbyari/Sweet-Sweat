import React, {Component} from 'react';
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';
// import { doc, setDoc, Timestamp } from "../services/firebase";


class EditProfile extends Component {
  constructor(){
    super();
    this.state = {
      showForm: false,
      name: '',
      DOB:'',
      aboutme:''
    }

    this._renderName = this._renderName.bind(this);
    this._renderDOB = this._renderDOB.bind(this);
    this._renderAboutMe = this._renderAboutMe.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }


  saveProfile(data){
    fsDb.collection("user_profiles")
    .where("user_id", "==", getCurrentUser().uid)
    .get()
    .then((snapshots) => {
      snapshots.forEach( (userProfile) => {
        fsDb.collection("user_profiles").doc(userProfile.id)
        .set({ name: data.name, DOB: data.DOB, aboutme: data.aboutme},{merge:true})
        .then(() => {console.log("Document successfully written!");})
      })
    })
  }

  _handleSubmit(event){
    event.preventDefault();
    this.saveProfile(this.state);
    this.setState({showForm:false})
  }
  _renderName(event){
    this.setState({name : event.target.value });
  }
  _renderDOB(event){
    this.setState({DOB : moment(event.target.value).toDate() });
  }
  _renderAboutMe(event){
    this.setState({aboutme : event.target.value });
  }

showForm(){
  return(
    <div>
    <form onSubmit={this._handleSubmit}>
      Name:<input type="text" onChange={this._renderName} />
      DOB:<input type="date" onChange={this._renderDOB} />
      Aboutme:<textarea type="text" onChange={this._renderAboutMe} />
      <br/>
      <input type="submit" value= "Save"/>
    </form>
    <input type="submit" value= "Cancel" onClick={() => this.setState({showForm: false}) }/>
    </div>
  )
}

  render(){
    return(
      <div>
        <button onClick={() => this.setState({showForm: true}) }>
          Edit Profile
        </button>
          {this.state.showForm ? this.showForm() : null}
      </div>
    )
  }

}



export default EditProfile
