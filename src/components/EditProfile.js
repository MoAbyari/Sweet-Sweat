import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, {Component} from 'react';
import { fsDb, storage} from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';
import { Card, Avatar  } from 'antd';
const { Meta } = Card;

/////////////////////////// Ant Design//////////  file upload /////////////////

class EditProfile extends Component {

  constructor(){
    super();
    this.state = {
      showForm: false,
      name: '',
      DOB:'',
      aboutme:'',
      photo: '',
      userImage: ''
    }

    this.uploadFile = this.uploadFile.bind(this);
///////////////////////////// Ant Upload file action ///////////////////////////
    this.uploadProps = {
      name: 'file',
      action: this.uploadFile,
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);}
        // } else if (info.file.status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
      },
    };
  }
// ///////////////////////////  Fetching existing User Info ///////////////////////
  componentDidMount(){
      this.fetchUserInfo();
  }

  fetchUserInfo = () => {
    fsDb.collection('user_profiles')
    .where('user_id', '==', getCurrentUser().uid)
    .get()
    .then((snapshots) => {
      snapshots.forEach((f) =>{
      this.setState({
        name: (f.data()).name,
        aboutme: (f.data()).aboutme,
        DOB: (f.data()).DOB,
        userImage: (f.data()).userImage
        });
      });
    });
  };
//////////////////////////////////   Upload File  //////////////////////////////
  uploadFile = (file) => {
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    return fileRef.put(file).then(() =>{
      fsDb.collection("user_profiles").doc('3LApeTneZZMdtwmqIOCc')
      .set({ photo: `gs://sweet-sweat.appspot.com/${file.name}`},{merge:true}).then((firebaseImage)=>{
        fileRef.getDownloadURL().then((url) => {
          this.setState({userImage: url })
        })
      })
    })
  }
///////////////////////  Set and update user info to Db ////////////////////////
  saveProfile(data){
    console.log("1");
    fsDb.collection("user_profiles")
    .where("user_id", "==", getCurrentUser().uid)
    .get()
    .then((snapshots) => {
      console.log("2");
      snapshots.forEach( (userProfile) => {
        fsDb.collection("user_profiles").doc(userProfile.id)
        .set({ name: data.name, DOB: data.DOB.toDate(), aboutme: data.aboutme, userImage:data.userImage},{merge:true}).then( () => {
        console.log("3");
        this.fetchUserInfo();
        })
      });
    })
    console.log("4");
  }
////////////////////////////  Form  eventHandler ///////////////////////////////
  _handleSubmit = (event) => {
    event.preventDefault();
    this.saveProfile(this.state);
    this.setState({showForm:false})
  }
  _renderName = (event) => {
    this.setState({name : event.target.value });
  }
  _renderDOB = (event) => {
    this.setState({DOB : moment(event.target.value)});
  }
  _renderAboutMe = (event) => {
    this.setState({aboutme : event.target.value });
  }
/////////////////////////////////  Form Show  //////////////////////////////////
  showForm(){
    return(
      <div>
        <form onSubmit={this._handleSubmit}>
          Name <input type="text" onChange={this._renderName} value = {this.state.name} required/>
          DOB <input type="date" onChange={this._renderDOB} />
          Aboutme <textarea type="text" onChange={this._renderAboutMe} value={this.state.aboutme} required/>
          <Upload {...this.uploadProps}>
          <Button icon={<UploadOutlined />}>Upload Profile Photo</Button>
          </Upload>
          <br/>
          <input type="submit" value= "Save"/>
        </form>
        <input type="submit" value= "Cancel" onClick={() => this.setState({showForm: false}) }/>
      </div>
    )
  }
/////////////////////////////////   Render Form  ////////////////////////////////
  render(){
    return(
      <div>
        <button onClick={() => this.setState({showForm: true}) }>
          Edit Profile
        </button>
          {this.state.showForm ? this.showForm() : null}
        <div> <UserInfo info= {this.state} imgURL= {this.state.userImage} /></div>
      </div>
      )
    }

}
///////////////////////////  Show existing details of user /////////////////////
class UserInfo extends Component {

  render(){
    const info = this.props.info;
    console.log("sag to roohet", info.DOB);
    return(
      <div>
        <Card
          style={{ width: 630 }}
          cover={<img alt="userpic" src={this.props.imgURL} />}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title= { (<div> <h1> <strong> {info.name} </strong> </h1>
            <h4> {info.DOB ? moment(info.DOB.toDate()).format('MMMM Do YYYY'): null} </h4> </div>)}
            description={info.aboutme}
          />
        </Card>
      </div>
    )
  }
}

export default EditProfile;
