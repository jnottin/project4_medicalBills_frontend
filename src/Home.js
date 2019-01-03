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
      procedure_selected_sort: 'avg_appendectomy_cost',
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
    // console.log(event.target.value)
    this.setState({ procedure_selected_sort: event.target.value });
    console.log(this.state.procedure_selected_sort)
    // this.sortHospitalList(this.state.procedure_selected_sort)
  }



  // dropDownSelectedSubmit(event) {
  //   event.preventDefault();
  //   this.setState({ procedure_selected: event.target.value });
  //   console.log(this.state.procedure_selected_sort)
  // }


  render() {
    const selectedProcedureSort = this.state.procedure_selected_sort
    const hospitalsProp = this.state.hospitals
    function sortHospByLowestCost() {
      hospitalsProp.sort(function (a, b) {
        console.log(a.avg_appendectomy_cost)
        if (selectedProcedureSort === 'avg_appendectomy_cost') {
          return a.avg_appendectomy_cost - b.avg_appendectomy_cost
        } else if (selectedProcedureSort === 'avg_breast_biopsy_cost') {
          return a.avg_breast_biopsy_cost - b.avg_breast_biopsy_cost
        } else if (selectedProcedureSort === 'avg_carotid_endarterectomy_cost') {
          return a.avg_carotid_endarterectomy_cost - b.avg_carotid_endarterectomy_cost
        } else if (selectedProcedureSort === 'avg_cataract_surgery_cost') {
          return a.avg_cataract_surgery_cost - b.avg_cataract_surgery_cost
        } else if (selectedProcedureSort === 'avg_cesarean_section_cost') {
          return a.avg_cesarean_section_cost - b.avg_cesarean_section_cost
        } else if (selectedProcedureSort === 'avg_coronary_artery_bypass_cost') {
          return a.avg_coronary_artery_bypass_cost - b.avg_coronary_artery_bypass_cost
        } else if (selectedProcedureSort === 'avg_debridement_of_wound_cost') {
          return a.avg_debridement_of_wound_cost - b.avg_debridement_of_wound_cost
        } else if (selectedProcedureSort === 'avg_free_skin_graft_cost') {
          return a.avg_free_skin_graft_cost - b.avg_free_skin_graft_cost
        } else if (selectedProcedureSort === 'avg_spinal_fusion_cost') {
          return a.avg_spinal_fusion_cost - b.avg_spinal_fusion_cost
        } else if (selectedProcedureSort === 'avg_total_hip_replacement_cost') {
          return a.avg_total_hip_replacement_cost - b.avg_total_hip_replacement_cost
        } else {
          console.log("error!!!!")
        }
      });
    }
    sortHospByLowestCost()


    // if (typeof this.state.hospitals != "undefined") {

    return (
      <div className="all-content">
        <About />

        <div className="fixed-med-bg"></div>
        <div id="search-near-you"></div>
        <div className="search-hosp-title">Find Procedure Prices Near You</div>
        <nav className="navBar">
          <div className="search-sort-inputs">
            <div className="typeDrpDn search-drpdwn-item">
              <label htmlFor="typeOfProcedure">Sort by Lowest Price Per Procedure: </label>
              <select name="typeOfProcedure" onChange={this.dropDownSelected} value={this.state.procedure_selected_sort} id="procedure-dropdn">
                <option value="Select A Procedure">Select A Procedure</option>
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
                <input type="submit" value="Submit" />
              </form>
            </div>
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
