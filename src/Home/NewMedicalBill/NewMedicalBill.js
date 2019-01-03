import React, { Component } from "react";
import axios from "axios";
import "./NewMedicalBill.css";
import { Redirect } from 'react-router'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const google = window.google;

const searchOptions = {
    location: new google.maps.LatLng(38.8885, -77.0931),
    radius: 2000,
    // types: ['address']
}

class NewMedicalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            lng: "",
            lat: "",
            cost: "",
            procedure_selected: '',
            redirect: false,
            geoAddress: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.showAutoInput = this.showAutoInput.bind(this);
        this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    }


    handleChange = geoAddress => {
        this.setState({ geoAddress });
    };

    handleSelect = geoAddress => {
        console.log(geoAddress)
        document.getElementById("autoCompleteSelected").innerText = "Hospital Selected: " + geoAddress;
        document.getElementById("autoCompleteInput").style.display = 'none';
        document.getElementById("editHospSelected").style.display = 'inline';
        var indexOfComma = geoAddress.indexOf(',')
        var nameFromGeoAdd = geoAddress.slice(0, indexOfComma)
        var addressFromGeoAdd = geoAddress.slice(indexOfComma + 2, -1)
        this.setState({
            name: nameFromGeoAdd,
            address: addressFromGeoAdd
        })
        geocodeByAddress(geoAddress)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.setState({
                    lat: latLng.lat,
                    lng: latLng.lng
                })
            })
            .catch(error => console.error('Error', error));
    };

    showAutoInput() {
        document.getElementById("autoCompleteInput").style.display = 'inline';
        document.getElementById("autoCompleteSelected").innerText = "Name of Hospital Where Procedure Took Place: ";
        document.getElementById("editHospSelected").style.display = 'none';
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    handleChangeDropdown(event) {
        this.setState({ procedure_selected: event.target.value });
    }

    handleFormSubmit(event) {
        console.log(this.state.procedure_selected)
        // console.log(this.state.name)
        event.preventDefault();
        axios
            // .post("https://medishareapp.herokuapp.com/newMedicalBill", {
            .post("http://localhost:3010/newMedicalBill", {
                name: this.state.name,
                address: this.state.address,
                lng: this.state.lng,
                lat: this.state.lat,
                cost: this.state.cost,
                procedure: this.state.procedure_selected
            })
            .then(res => {
                console.log("res");
                console.log(res);
                this.setState({ redirect: true });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        // if (this.state.redirect === true) {
        //     return <Redirect to='/' />
        // }

        return (
            <div className="newMedicalBill-content">
                <h1 className="newMedicalBill-title">New Medical Bill</h1>
                <label className="newBill-label" htmlFor="name" id="autoCompleteSelected">Name of Hospital Where Procedure Took Place: </label> <br />
                <PlacesAutocomplete
                    value={this.state.geoAddress}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    searchOptions={searchOptions}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input id='autoCompleteInput'
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <button id="editHospSelected" onClick={this.showAutoInput}>Edit Hospital Selected</button>
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
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
                                            <div>{suggestion.address}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>

                <form onSubmit={this.handleFormSubmit}>
                    <p className="typeOfProcedure-content">
                        <label className="newBill-label" htmlFor="typeOfProcedure">Type of Procedure: </label> <br />
                        <select name="typeOfProcedure" onChange={this.handleChangeDropdown} value={this.state.value} id="procedure-dropdn">
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
                    </p>
                    <p>
                        <label className="newBill-label" htmlFor="cost">Cost of Procedure: </label> <br />
                        <input
                            type="number"
                            name="cost"
                            value={this.state.cost}
                            onChange={this.handleInputChange}
                            placeholder="Cost of Procedure"
                        />
                    </p>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default NewMedicalBill;
