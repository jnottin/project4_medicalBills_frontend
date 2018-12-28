import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './Home/Header/Header.js'
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      userCoordinates: {
        lat: 38.8816,
        lng: -77.0910
      },

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setMapCenter = this.setMapCenter.bind(this);
  }
  componentDidMount() {
    console.log("component did mount")
    axios
      // .get("http://roomkind.herokuapp.com/api/roomKind")
      .get("http://localhost:3010/api/hospitals")
      .then(res => {
        this.setState({
          hospitals: res.data
        });
      })

      .catch(err => {
        console.log(err);
      });
  }

  setMapCenter(event) {
    event.preventDefault();
    this.setState({
      userCoordinates: {
        lat: parseFloat(this.lat.value),
        lng: parseFloat(this.lng.value),
      }
    })
    console.log(this.state.userCoordinates)
  }

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="all-content">
        <Header />
        {/*  MAKE NAV BAR WITH ZIP/PROCEDURE HERE TO PASS DOWN TO MAP/HOSPITAL LIST*/}
        <div className="grid">
          <div className="hosp-col">
            <Route
              path="/"
              render={props => (
                <HospitalList
                  {...props}
                  hospitals={this.state.hospitals}
                />
              )}
            />
          </div>
          <div className="map-col">
            <form onSubmit={this.setMapCenter}>
              <label>
                Latitude
            <input type="text" ref={el => this.lat = el} />
              </label>
              <label>
                Longitude
            <input type="text" ref={el => this.lng = el} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            {/*<div className="input">
              <label htmlFor=""> Latitude:
                    <input
                  type="text"
                  name="Latitude"
                  value={this.state.userCoordinates.lat}
                  onChange={this.handleInputChange}
                  placeholder="Latitude"
                />
              </label>
              <label htmlFor="Longitude"> Longitude:
                    <input
                  type="text"
                  name="Longitude"
                  value={this.state.userCoordinates.lng}
                  onChange={this.handleInputChange}
                  placeholder="Longitude"
                />
              </label>
              <button onClick={this.setMapCenter}>submit</button>
            </div> */}
            <Route
              path="/"
              render={props => (
                <MapContainer
                  {...props}
                  userCoordinates={this.state.userCoordinates}
                  setMapCenter={this.setMapCenter}
                />
              )}
            />
          </div>
        </div>
      </div >
    );
  }
}

export default App;
