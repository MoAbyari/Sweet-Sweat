import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';
import CardsContainer from '../components/CardsContainer';

class Home extends Component {
  render () {
    return (
      <div>
        <SearchBar />
        <CardsContainer />
      </div>
    )
  }
}
export default Home;
