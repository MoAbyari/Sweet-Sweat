import React, { Component } from 'react';
import { fsDb } from "../services/firebase"

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    }
  }

  handleChange = (event) => {
    this.setState({searchInput: event.target.value});
  }

  handleSearch = (event) => {
    event.preventDefault();
    const activities = fsDb.collection("activities").where("type", "==", this.state.searchInput).get().then((snapshot) => {
      snapshot.forEach((doc) => {
               // doc.data() is never undefined for query doc snapshots
               console.log(doc.id, " => ", doc.data());
           });
    })
  }

  render() {
    return(
      <div>
        <form>
          <input
            onChange={ this.handleChange }
            type="search"
            placeholder="Search posts"
            id="header-search"
            name="s"
          />
          <button onClick={ this.handleSearch }>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
