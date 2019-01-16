import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Geocode from "react-geocode";
import './Home.css';
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import Footer from './Home/Footer/Footer.js'
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import axios from "axios";

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION

Geocode.setApiKey("AIzaSyC2KMba-R4OMF2ROiKGpYGiXBpjyWFNV-4");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      userCoordinates: {
        lat: 38.8885,
        lng: -77.0931
      },
      zoom: 12,
      location: '',
      procedure_selected_sort: 'avg_appendectomy_cost',
      geoAddress: '',
    };
    this.initialSetMapCenter = this.initialSetMapCenter.bind(this);
    this.setMapCenterFromLocation = this.setMapCenterFromLocation.bind(this);
    this.dropDownSelected = this.dropDownSelected.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSelect = geoAddress => {
    console.log(geoAddress)
    geocodeByAddress(geoAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        this.setState({
          userCoordinates: {
            lat: latLng.lat,
            lng: latLng.lng
          },
          zoom: 12,
        })
      })
      .catch(error => console.error('Error', error));
  };

  handleChange = geoAddress => {
    this.setState({ geoAddress });
  };

  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }


  componentDidMount() {
    axios
      .get(toggleBackendLink + "/api/hospitals/")
      .then(res => {
        this.setState({
          hospitals: res.data
        });
      })

      .catch(err => {
        console.log(err);
      });
  }

  initialSetMapCenter(event) {
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
    event.preventDefault();
    this.setState({ location: this.location.value })
    Geocode.fromAddress(this.location.value).then(
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

  sortHospitalList(selectedProcedure) {
    console.log(selectedProcedure)
    // var selectedProcedure = this.state.procedure_selected_sort
    var sortHospitalsList = this.state.hospitals.sort(function (a, b, selectedProcedure) {
      console.log(a.selectedProcedure)
      return a.selectedProcedure - b.selectedProcedure
    })
    console.log(sortHospitalsList)
    this.setState({
      hospitals: sortHospitalsList
    })
  }

  dropDownSelected(event) {
    this.setState({ procedure_selected_sort: event.target.value });
    console.log(this.state.procedure_selected_sort)
  }


  render() {
    const selectedProcedureSort = this.state.procedure_selected_sort
    const hospitalsProp = this.state.hospitals
    function sortHospByLowestCost() {
      hospitalsProp.sort(function (a, b) {
        return (a[selectedProcedureSort] === undefined) - (b[selectedProcedureSort] === undefined) || +(a[selectedProcedureSort] > b[selectedProcedureSort]) || -(a[selectedProcedureSort] < b[selectedProcedureSort]);
      });
    }
    sortHospByLowestCost()

    return (
      <div className="all-content">
        <div className="fixed-med-bg">
          <div id="we-do" className="what-we-do">
            <p className="about-page-content">Medi-Share is a price sharing app to help people who are not insured find the best prices for medical procedures. Users can see the average prices that real patients have paid for 10 of the most common medical procedures.</p>
            <p className="about-page-content">Users who "Sign Up" or "Log In" can submit and view their own medical bills to help grow our database.</p>
            <p className="about-page-content">Let's bring transparency to prices in the medical community!</p>
          </div>
        </div>
        <div id="search-near-you"></div>
        <div className="search-hosp-title">Find Procedure Prices Near You</div>
        <nav className="navBar">
          <div className="search-sort-inputs">
            <div className="typeDrpDn search-drpdwn-item">
              <label htmlFor="typeOfProcedure">Sort by Lowest Price Per Procedure: </label>
              <select name="typeOfProcedure" onChange={this.dropDownSelected} value={this.state.procedure_selected_sort} id="procedure-dropdn">
                <option value="avg_appendectomy_cost">Appendectomy</option>
                <option value="avg_breast_biopsy_cost">Breast Biopsy</option>
                <option value="avg_carotid_endarterectomy_cost">Carotid Endarterectomy</option>
                <option value="avg_cataract_surgery_cost">Cataract Surgery</option>
                <option value="avg_cesarean_section_cost">Cesarean Section</option>
                <option value="avg_coronary_artery_bypass_cost">Coronary Artery Bypass</option>
                <option value="avg_debridement_of_wound_cost">Debridement of Wound</option>
                <option value="avg_free_skin_graft_cost">Free Skin Graft</option>
                <option value="avg_spinal_fusion_cost">Spinal Fusion</option>
                <option value="avg_total_hip_replacement_cost">Total Hip Replacement</option>
              </select>
            </div>
            <div className="searchMap search-drpdwn-item">
              <form onSubmit={this.setMapCenterFromLocation}>
                <label>
                  Search For Places On The Map: </label>
                <input type="text" ref={el => this.location = el} />
                <input className="search-submit-btn" type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </nav>
        <div className="grid">
          <div className="hosp-col">
            <Route
              path="/"
              render={props => (
                <HospitalList
                  {...props}
                  hospitals={this.state.hospitals}
                  procedure_selected_sort={this.state.procedure_selected_sort}
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
                  initialSetMapCenter={this.initialSetMapCenter}
                  location={this.state.location}
                  hospitals={this.state.hospitals}
                />
              )}
            />
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default Home;
