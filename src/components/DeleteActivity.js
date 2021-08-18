import React, {Component} from 'react';
import { fsDb } from "../services/firebase"
import { getCurrentUser } from '../helpers/auth';
import moment from 'moment';


class DeleteActivity extends Component {

///////////////////////  Delete user info from Db ////////////////////////
deleteActivity = () => {
  fsDb
  .collection("activities").doc(this.props.documentId).delete()
  .then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

_handleDelete = (event) => {
  this.deleteActivity();
}

/////////////////////////////////   Render Form ////////////////////////////////
  render() {
    return(
      <div>
        <button onClick={ this._handleDelete }>
          Delete Activity
        </button>
      </div>
    );
  }
}


export default DeleteActivity;
