import React, { Component } from 'react';
import './App.css';
import Header from './Home/Header/Header.js'
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import axios from "axios";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     hospitals: [],
  //   };
  // }
  // componentDidMount() {
  //   axios
  //     // .get("http://roomkind.herokuapp.com/api/roomKind")
  //     .get("http://localhost:3010/api/hospitals")
  //     .then(res => {
  //       this.setState({
  //         hospitals: res.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <div>
        <Header />
        {/*  MAKE NAV BAR WITH ZIP/PROCEDURE HERE TO PASS DOWN TO MAP/HOSPITAL LIST*/}
        <div className="grid">
          <div className="hosp-col">
            <HospitalList />
          </div>
          <div className="map-col">
            <MapContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
