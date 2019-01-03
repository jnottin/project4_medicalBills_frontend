import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Geocode from "react-geocode";
import './Home.css';
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import About from './Home/About/About.js'
import Footer from './Home/Footer/Footer.js'
import axios from "axios";


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
      procedure_selected_sort: '',
    };
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMapCenterFromLocation = this.setMapCenterFromLocation.bind(this);
    this.dropDownSelected = this.dropDownSelected.bind(this);
    // this.dropDownSelectedSubmit = this.dropDownSelectedSubmit.bind(this);
  }




  componentDidMount() {
    axios
      // .get("https://medishareapp.herokuapp.com/api/hospitals")
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
      zoom: 12,
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

  dropDownSelected(event) {
    // console.log(event.target.value)
    this.setState({ procedure_selected_sort: event.target.value });
    console.log(this.state.procedure_selected_sort)
  }

  // dropDownSelectedSubmit(event) {
  //   event.preventDefault();
  //   this.setState({ procedure_selected: event.target.value });
  //   console.log(this.state.procedure_selected_sort)
  // }


  render() {

    // if (typeof this.state.hospitals != "undefined") {

    return (
      <div className="all-content">
        <About />

        <div className="fixed-med-bg"></div>
        <div id="search-near-you"></div>
        <div className="search-hosp-title">Search For A Hospital Near You</div>
        <nav className="navBar">
          <div className="search-sort-inputs">
            <label htmlFor="typeOfProcedure">Type of Procedure: </label>
            <select name="typeOfProcedure" onChange={this.dropDownSelected} value={this.state.procedure_selected_sort} id="procedure-dropdn">
              <option value="Select A Procedure">Select A Procedure</option>
              <option value="appendectomy_cost">Appendectomy</option>
              <option value="breast_biopsy_cost">Breast Biopsy</option>
              <option value="carotid_endarterectomy_cost">Carotid Endarterectomy</option>
              <option value="cataract_surgery_cost">Cataract Surgery</option>
              <option value="cesarean_section_cost">Cesarean Section</option>
              <option value="coronary_artery_bypass_cost">Coronary Artery Bypass</option>
              <option value="debridement_of_wound_cost">Debridement of Wound</option>
              <option value="free_skin_graft_cost">Free Skin Graft</option>
              <option value="spinal_fusion_cost">Spinal Fusion</option>
              <option value="total_hip_replacement_cost">Total Hip Replacement</option>
            </select>
            <form onSubmit={this.setMapCenterFromLocation}>
              <label>
                Give address and see on map: </label>
              <input type="text" ref={el => this.location = el} />
              <input type="submit" value="Submit" />
            </form>
          </div>
          {/* <button className="submit-new-bill-btn"><a className="submit-new-bill-link" href="/testAuto">test autocomplete</a></button> */}
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
                  setMapCenter={this.setMapCenter}
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
