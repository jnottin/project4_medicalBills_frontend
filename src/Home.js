import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Geocode from "react-geocode";
import './Home.css';
import HospitalList from './Home/HospitalList/HospitalList.js'
import MapContainer from './Home/Map/Map.js'
import Footer from './Home/Footer/Footer.js'
import PlacesAutocomplete, {
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
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMapCenterFromLocation = this.setMapCenterFromLocation.bind(this);
    this.dropDownSelected = this.dropDownSelected.bind(this);
    // this.dropDownSelectedSubmit = this.dropDownSelectedSubmit.bind(this);
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
    this.setState({ procedure_selected_sort: event.target.value });
    console.log(this.state.procedure_selected_sort)
  }


  render() {
    console.log(localStorage)

    const selectedProcedureSort = this.state.procedure_selected_sort
    const hospitalsProp = this.state.hospitals
    // console.log(hospitalsProp)
    function sortHospByLowestCost() {
      hospitalsProp.sort(function (a, b) {
        if (selectedProcedureSort === 'avg_appendectomy_cost') {
          return (a.avg_appendectomy_cost === undefined) - (b.avg_appendectomy_cost === undefined) || +(a.avg_appendectomy_cost > b.avg_appendectomy_cost) || -(a.avg_appendectomy_cost < b.avg_appendectomy_cost);
        } else if (selectedProcedureSort === 'avg_breast_biopsy_cost') {
          return (a.avg_breast_biopsy_cost === undefined) - (b.avg_breast_biopsy_cost === undefined) || +(a.avg_breast_biopsy_cost > b.avg_breast_biopsy_cost) || -(a.avg_breast_biopsy_cost < b.avg_breast_biopsy_cost);
        } else if (selectedProcedureSort === 'avg_carotid_endarterectomy_cost') {
          return (a.avg_carotid_endarterectomy_cost === undefined) - (b.avg_carotid_endarterectomy_cost === undefined) || +(a.avg_carotid_endarterectomy_cost > b.avg_carotid_endarterectomy_cost) || -(a.avg_carotid_endarterectomy_cost < b.avg_carotid_endarterectomy_cost);
        } else if (selectedProcedureSort === 'avg_cataract_surgery_cost') {
          return (a.avg_cataract_surgery_cost === undefined) - (b.avg_cataract_surgery_cost === undefined) || +(a.avg_cataract_surgery_cost > b.avg_cataract_surgery_cost) || -(a.avg_cataract_surgery_cost < b.avg_cataract_surgery_cost);
        } else if (selectedProcedureSort === 'avg_cesarean_section_cost') {
          return (a.avg_cesarean_section_cost === undefined) - (b.avg_cesarean_section_cost === undefined) || +(a.avg_cesarean_section_cost > b.avg_cesarean_section_cost) || -(a.avg_cesarean_section_cost < b.avg_cesarean_section_cost);
        } else if (selectedProcedureSort === 'avg_coronary_artery_bypass_cost') {
          return (a.avg_coronary_artery_bypass_cost === undefined) - (b.avg_coronary_artery_bypass_cost === undefined) || +(a.avg_coronary_artery_bypass_cost > b.avg_coronary_artery_bypass_cost) || -(a.avg_coronary_artery_bypass_cost < b.avg_coronary_artery_bypass_cost);
        } else if (selectedProcedureSort === 'avg_debridement_of_wound_cost') {
          return (a.avg_debridement_of_wound_cost === undefined) - (b.avg_debridement_of_wound_cost === undefined) || +(a.avg_debridement_of_wound_cost > b.avg_debridement_of_wound_cost) || -(a.avg_debridement_of_wound_cost < b.avg_debridement_of_wound_cost);
        } else if (selectedProcedureSort === 'avg_free_skin_graft_cost') {
          return (a.avg_free_skin_graft_cost === undefined) - (b.avg_free_skin_graft_cost === undefined) || +(a.avg_free_skin_graft_cost > b.avg_free_skin_graft_cost) || -(a.avg_free_skin_graft_cost < b.avg_free_skin_graft_cost);
        } else if (selectedProcedureSort === 'avg_spinal_fusion_cost') {
          return (a.avg_spinal_fusion_cost === undefined) - (b.avg_spinal_fusion_cost === undefined) || +(a.avg_spinal_fusion_cost > b.avg_spinal_fusion_cost) || -(a.avg_spinal_fusion_cost < b.avg_spinal_fusion_cost);
        } else if (selectedProcedureSort === 'avg_total_hip_replacement_cost') {
          return (a.avg_total_hip_replacement_cost === undefined) - (b.avg_total_hip_replacement_cost === undefined) || +(a.avg_total_hip_replacement_cost > b.avg_total_hip_replacement_cost) || -(a.avg_total_hip_replacement_cost < b.avg_total_hip_replacement_cost);
        } else {
          console.log("error!!!!")
          return null
        }
      });
    }
    sortHospByLowestCost()

    return (
      <div className="all-content">
        <div className="fixed-med-bg">
          <div id="we-do" className="what-we-do">
            <p className="about-page-content">Medi-Share is a price sharing app to help people who are not insured find the best prices for medical procedures.</p>
            <p className="about-page-content">Users can see the average prices that real patients have paid for 10 of the most common medical procedures. They can also submit their own medical bills to help grow our database.</p>
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
              {/* <PlacesAutocomplete
                value={this.state.geoAddress}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={searchOptions}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        const style = suggestion.active
                          ? { backgroundColor: '#424857' }
                          : { backgroundColor: '#636c83' };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <div>{suggestion.formattedSuggestion.mainText}</div>
                            <div>{suggestion.formattedSuggestion.secondaryText}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete> */}

              <form onSubmit={this.setMapCenterFromLocation}>
                <label>
                  Search For Places On The Map: </label>
                <input type="text" ref={el => this.location = el} />
                <input type="submit" value="Submit" />
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
  }
}

export default Home;
