import React, { Component } from "react";
import axios from "axios";
import "./NewMedicalBill.css";

class NewMedicalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            lng: "",
            lat: "",
            cost: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
                cost: this.state.cost,
                // procedures: [Procedure],
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div id="newResidenceForm" className="closed newResidenceForm">
                <h1>New Medical Bill</h1>
                <form className="newBookResidence" onSubmit={this.handleFormSubmit}>
                    <p>
                        <label htmlFor="name">Name of Hospital</label> <br />
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            placeholder="Name of Hospital"
                        />
                    </p>
                    <p>
                        <label htmlFor="address">Address Of Hospital</label> <br />
                        <input
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleInputChange}
                            placeholder="address of Hospital"
                        />
                    </p>
                    {/* HOW TO DO LOCATION? WITH GEOCODE OF ADDRESS? GOOGLE PLACES? */}
                    <p>
                        <label htmlFor="Latitude">Latitude</label> <br />
                        <input
                            type="number"
                            name="lat"
                            value={this.state.lat}
                            onChange={this.handleInputChange}
                            placeholder="latitude"
                        />
                    </p>
                    <p>
                        <label htmlFor="longitude">Longitude</label> <br />
                        <input
                            type="number"
                            name="lng"
                            value={this.state.lng}
                            onChange={this.handleInputChange}
                            placeholder="longitude"
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
