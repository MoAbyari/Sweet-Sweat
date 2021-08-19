import React, { Component } from 'react';
import { fsDb } from "../services/firebase"

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const activityTypes = [
  { type: 'Running' },
  { type: 'Walking' },
  { type: 'Boxing' },
  { type: 'Swimming' },
  { type: 'Fit-boxing' },
]

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    }
  }

  handleChange = (event, value) => {
    this.setState({searchInput: value});
  }

  handleSearch = (event) => {
    event.preventDefault();
    if (!this.state.searchInput?.type) return;
    fsDb.collection("activities").where("type", "==", this.state.searchInput.type).get().then((snapshots) => {
      let activities = [];
      snapshots.forEach((doc) => {
          activities.push(doc.data());
       });
       this.props.onSearch(activities);
    })
  }

  render() {
    return(
      <div>
        <form>

          <Autocomplete
            onChange={ this.handleChange }
            id="combo-box-demo"
            options={ activityTypes }
            getOptionLabel={(option) => option.type}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search activity" variant="outlined" />}
          />

          <button onClick={ this.handleSearch }>Search</button>

        </form>
      </div>
    );
  }
}

export default SearchBar;
