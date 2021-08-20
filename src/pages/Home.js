import React, { Component } from 'react';
import { fsDb } from "../services/firebase"
import SearchBar from '../components/SearchBar';
import CardsContainer from '../components/CardsContainer';

class Home extends Component {
  constructor() {
  super();
    this.state = {
      allActivities: []
    }
  }

  componentDidMount() {
    this.fetchAllActivities();
  }

  fetchAllActivities = () => {
    const fetchActivities = fsDb.collection("activities").get().then((snapshot) => {
      let activities = [];
      snapshot.forEach((activity) => {
        activities.push(activity.data())
      })
      this.setState({allActivities: activities } )
    })
  }

  onSearch = (searchedActivities) => {
    this.setState({allActivities: searchedActivities})
  }

  render () {
    return (
      <div>
        <SearchBar onSearch={ this.onSearch } clearSearch={ this.fetchAllActivities } />
        <CardsContainer activities={ this.state.allActivities } />
      </div>
    )
  }
}
export default Home;
