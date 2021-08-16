import React from 'react';
import SearchBar from '../components/SearchBar';
import CardsContainer from '../components/CardsContainer';

class Home extends React.Component {
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
