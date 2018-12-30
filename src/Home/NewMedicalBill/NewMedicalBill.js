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
            name_of_procedure: "",
            cost: "",
            insurance_provider: "",
            date_of_procedure: "",
            redirect: false,
            geoAddress: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.showAutoInput = this.showAutoInput.bind(this);
    }

    handleChange = geoAddress => {
        this.setState({ geoAddress });
    };

    handleSelect = geoAddress => {
        console.log(geoAddress)
        document.getElementById("autoCompleteSelected").innerText = "Hospital selected: " + geoAddress;
        document.getElementById("autoCompleteInput").style.display = 'none';
        document.getElementById("editHospSelected").style.display = 'inline';

        this.setState({
            name: geoAddress
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
        document.getElementById("autoCompleteInput").style.display = 'block';
        document.getElementById("autoCompleteSelected").innerText = "Name of Hospital Where Procedure Took Place";
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

    handleFormSubmit(event) {
        event.preventDefault();
        axios
            //   .post("http://roomkind.herokuapp.com/project3roomKind/residences", {
            .post("http://localhost:3010/newMedicalBill", {
                name: this.state.name,
                address: this.state.address,
                lng: this.state.lng,
                lat: this.state.lat,
                name_of_procedure: this.state.name_of_procedure,
                cost: this.state.cost,
                insurance_provider: this.state.insurance_provider,
                date_of_procedure: this.state.date_of_procedure,
                // procedures: [Procedure],
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
            <div id="newResidenceForm" className="closed newResidenceForm">
                <h1>New Medical Bill</h1>
                <label htmlFor="name" id="autoCompleteSelected">Name of Hospital Where Procedure Took Place</label> <br />
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
                                        ? { backgroundColor: 'black' }
                                        : { backgroundColor: 'white' };

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
                    <p>
                        <label htmlFor="name_of_procedure">Name of Procedure</label> <br />
                        <input
                            type="text"
                            name="name_of_procedure"
                            value={this.state.name_of_procedure}
                            onChange={this.handleInputChange}
                            placeholder="Name of Procedure"
                        />
                    </p>
                    <p>
                        <label htmlFor="cost">Cost of Procedure</label> <br />
                        <input
                            type="number"
                            name="cost"
                            value={this.state.cost}
                            onChange={this.handleInputChange}
                            placeholder="Cost of Procedure"
                        />
                    </p>
                    <p>
                        <label htmlFor="insurance_provider">Insurance Provider</label> <br />
                        <input
                            type="text"
                            name="insurance_provider"
                            value={this.state.insurance_provider}
                            onChange={this.handleInputChange}
                            placeholder="Insurance Provider"
                        />
                    </p>
                    <p>
                        <label htmlFor="date_of_procedure">Date of Procedure</label> <br />
                        <input
                            type="date"
                            name="date_of_procedure"
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            placeholder="Date of Procedure"
                        />
                    </p>
                    <p>
                        <button type="submit" onClick={this.handleFormSubmit}>
                            Submit
            </button>
                        {/* <button type="submit" onClick={() => { this.props.createResidence(this.state) }}>Submit</button> */}
                    </p>
                </form>
            </div>
        );
    }
}

export default NewMedicalBill;
