import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Geocode from "react-geocode";
import './App.css';
import Header from './Home/Header/Header.js'
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import axios from "axios";

Geocode.setApiKey("AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      userCoordinates: {
        lat: 38.8885,
        lng: -77.0931
      },
      zoom: 14,
      location: '',
      // showingInfoWindow: false,  //Hides or the shows the infoWindow
      // activeMarker: {},          //Shows the active marker upon click
      // selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    };
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMapCenterFromLocation = this.setMapCenterFromLocation.bind(this);
  }

  // onMarkerClick = (props, marker, e) =>
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });

  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

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
      },
      zoom: 14,
    })
    console.log(this.state.userCoordinates)
    console.log(this.state.zoom)
  }

  setMapCenterFromLocation(event) {
    event.preventDefault();
    this.setState({ location: this.location.value })
    // console.log(this.state.location)
    Geocode.fromAddress(this.state.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({
          userCoordinates: {
            lat: lat,
            lng: lng,
          },
        })
      },
      error => {
        console.error(error);
        alert(error)
      }
    );
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
            <form onSubmit={this.setMapCenterFromLocation}>
              <label>
                Give address and see on map
            <input type="text" ref={el => this.location = el} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <Route
              path="/"
              render={props => (
                <MapContainer
                  {...props}
                  userCoordinates={this.state.userCoordinates}
                  zoom={this.state.zoom}
                  setMapCenter={this.setMapCenter}
                  location={this.state.location}
                  hospitals={this.state.hospitals}
                //Trying to connect HospList and Map
                // showingInfoWindow={this.state.showingInfoWindow}
                // setMapCenter={this.setMapCenter}
                // activeMarker={this.state.activeMarker}
                // selectedPlace={this.state.selectedPlace}
                // onMarkerClick={this.onMarkerClick}
                // onClose={this.onClose}
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
