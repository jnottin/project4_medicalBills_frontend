import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Geocode from "react-geocode";
import './Home.css';
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import axios from "axios";


Geocode.setApiKey("AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      procedures: [],
      userCoordinates: {
        lat: 38.8885,
        lng: -77.0931
      },
      zoom: 12,
      location: '',
    };
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMapCenterFromLocation = this.setMapCenterFromLocation.bind(this);
  }


  componentDidMount() {
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
    axios
      // .get("http://roomkind.herokuapp.com/api/roomKind")
      .get("http://localhost:3010/api/procedures")
      .then(res => {
        this.setState({
          procedures: res.data
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
      zoom: 12,
    })
    console.log(this.state.userCoordinates)
    console.log(this.state.zoom)
  }

  setMapCenterFromLocation(event) {

    //in your code you are saying you want to select a map location after selecting a procedure
    // you should only be setting a map location after selecting a location
    // just because you have selected a procedure doesn't mean that a a location is also selected

    /* 

      you are using the same function on both submit buttons 

        <form onSubmit={this.setMapCenterFromLocation}>
            <select name="cars" id="procedure-dropdn">
              <option value="Select A Procedure">Select A Procedure</option>
              <option value="Select A Procedure">All Procedures</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={this.setMapCenterFromLocation}>
            <label>

          

    */

    // in the UI it isn't clear what work flow the user needs to get the application to work
    // do you click the locations on the left hand side, do you have to type in a new location,
    // chrome is giving you errors telling you that your map may not work properly because you have
    // included multiple google maps

//     You have included the Google Maps JavaScript API multiple times on this page. This may cause unexpected errors.
// function.console.(anonymous function) @ index.js:1446
// rh @ js?key=AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4&callback=loaderCB01546531082638&libraries=places&v=3&language=en:132
// zh @ js?key=AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4&callback=loaderCB01546531082638&libraries=places&v=3&language=en:130
// google.maps.Load @ js?key=AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4&callback=loaderCB01546531082638&libraries=places&v=3&language=en:21
// (anonymous) @ js?key=AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4&callback=loaderCB01546531082638&libraries=places&v=3&language=en:210
// (anonymous) @ js?key=AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4&callback=loaderCB01546531082638&libraries=places&v=3&language=en:210
// 10:58:03.371 


// when I was using the map it would jump to one location, the location of the thing that I searched before. it seemed to be a search
// behind.



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
    const proceduresList = this.state.procedures

    //TRYING TO SORT PROCEDURES ALPHABETICALLY
    // const procedures = this.state.procedures
    // const proceduresList = procedures.filter(procedure => procedure.name_of_procedure)
    // function sortProceduresAlpha() {
    //   proceduresList.sort();
    //   console.log(proceduresList)
    // }
    // sortProceduresAlpha()

    proceduresList.map(procedure => {
      var select = document.getElementById("procedure-dropdn")
      var option = document.createElement('option');
      option.text = option.value = procedure.name_of_procedure;
      select.add(option);
    });
    // if (typeof residence != "undefined") {
    return (
      <div className="all-content">
        <nav className="navBar">
          <form onSubmit={this.setMapCenterFromLocation}>
            <select name="cars" id="procedure-dropdn">
              <option value="Select A Procedure">Select A Procedure</option>
              <option value="Select A Procedure">All Procedures</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={this.setMapCenterFromLocation}>
            <label>
              Give address and see on map
            <input type="text" ref={el => this.location = el} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button className="submit-new-bill-btn"><a className="submit-new-bill-link" href="/submitCost">Submit New Medical Bill</a></button>
          <button className="submit-new-bill-btn"><a className="submit-new-bill-link" href="/testAuto">test autocomplete</a></button>
        </nav>
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
                />
              )}
            />
          </div>
        </div>
      </div >
    );
    // } else {
    //   return (
    //     <div>
    //       <h1>Not Loaded Yet</h1>
    //     </div>
    //   );
    // }
  }
}

export default Home;
