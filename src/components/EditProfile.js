import React, {Component} from 'react';
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';


class EditProfile extends Component {
  constructor(){
    super();
    this.state = {
      showForm: false,
      name: '',
      DOB:'',
      aboutme:'',
      user_profile:[]
    }

    this._renderName = this._renderName.bind(this);
    this._renderDOB = this._renderDOB.bind(this);
    this._renderAboutMe = this._renderAboutMe.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
///////////////////////////  Fetching existing User Info ///////////////////////
  componentDidMount(){
        fsDb.collection('user_profiles')
        .where('user_id', '==', getCurrentUser().uid)
        .get()
        .then((snapshots) => {
          let user_profile = [];
          snapshots.forEach((f) =>{
            user_profile.push(f.data());
          });
        this.setState({user_profile: user_profile});
        });
      }
///////////////////////  Set and update user info to Db ////////////////////////

  saveProfile(data){
    fsDb.collection("user_profiles")
    .where("user_id", "==", getCurrentUser().uid)
    .get()
    .then((snapshots) => {
      snapshots.forEach( (userProfile) => {
        fsDb.collection("user_profiles").doc(userProfile.id)
        .set({ name: data.name, DOB: data.DOB, aboutme: data.aboutme},{merge:true})
      })
    })
  }

////////////////////////////  Form  eventHandler ///////////////////////////////

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

/////////////////////////////////  Form Show  //////////////////////////////////

  showForm(){
    return(
      <div>
      <form onSubmit={this._handleSubmit}>
        Name:<input type="text" onChange={this._renderName} value={this.state.name} />
        DOB:<input type="date" onChange={this._renderDOB} />
        Aboutme:<textarea type="text" onChange={this._renderAboutMe} />
        <br/>
        <input type="submit" value= "Save"/>
      </form>
      <input type="submit" value= "Cancel" onClick={() => this.setState({showForm: false}) }/>
      </div>
    )
  }
/////////////////////////////////   Render Form ////////////////////////////////
  render(){
    return(
      <div>
        <button onClick={() => this.setState({showForm: true}) }>
          Edit Profile
        </button>
          {this.state.showForm ? this.showForm() : null}
          <div> <UserInfo info= {this.state.user_profile} /></div>
      </div>
      )
    }

}

//////////////////////////////  Show existing details of user //////////////////
class UserInfo extends Component {

  fetchUserInfo = () => {
    const userInfo = this.props.info;
    return userInfo.map( (i) => {
      return (
        <div>
          <h2>{i.name}</h2>
          <h3>{moment(i.DOB.toDate()).format ('MMMM Do YYYY')}</h3>
          <h4>{i.aboutme}</h4>
        </div>

      );
    });
  }

  render(){

    return(
      <div>
        {this.fetchUserInfo()}
      </div>
    )
  }
}






export default EditProfile
