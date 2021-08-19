import React, { Component } from 'react';
import HomePageCard from './HomePageCard';

class CardsContainer extends Component {
  // constructor() {
  // super();
  //   this.state = {
  //     allActivities: []
  //   }
  // }
//
// componentDidMount() {
//   const fetchActivities = fsDb.collection("activities").get().then((snapshot) => {
//     let activities = [];
//     snapshot.forEach((activity) => {
//       activities.push(activity.data())
//     })
//     this.setState({allActivities: activities } )
//   })
// }

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
