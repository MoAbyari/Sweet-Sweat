import React, { Component } from 'react';
import HomePageCard from './HomePageCard';

class CardsContainer extends Component {

renderActivities =  () => {
  return this.props.activities.map((activity, index) => {
    return <HomePageCard key={index} activity={activity} />
  });
}

  render() {
    return(
      <div className="thumbnail">
        {this.renderActivities()}
      </div>
    )
  }
}
export default CardsContainer;
