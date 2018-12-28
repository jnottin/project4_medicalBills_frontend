import React, { Component } from 'react';
import './HospitalList.css';


class HospitalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalName: 'Hospital List TEST',
        };
        this.setHospitalNameWithSubmit = this.setHospitalNameWithSubmit.bind(this);
    }

    setHospitalNameWithSubmit(event) {
        event.preventDefault();
        this.setState({ hospitalName: this.element.value });
    }

    render() {
        const hospitalsProp = this.props.hospitals
        function sortHospByLowestCost() {
            hospitalsProp.sort(function (a, b) { return a.cost - b.cost });
        }
        sortHospByLowestCost()
        const hospitals = hospitalsProp.map(hospital => {
            return (
                <div key={hospital._id} className="specific-hospital">
                    <h3>{hospital.name}</h3>
                    <h4>Address: {hospital.address}</h4>
                    <h4>Latitude: {hospital.lat}</h4>
                    <h4>Longitude: {hospital.long}</h4>
                    <h4>Cost: ${hospital.cost}</h4>
                </div>
            );
        });

        return (
            <div className="hosp-grid">
                <form onSubmit={this.setHospitalNameWithSubmit}>
                    <label>
                        Name:
            <input type="text" ref={el => this.element = el} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    <h2 className="hosp-title">{this.state.hospitalName}</h2>
                </div>
                <div className="hosp-content">{hospitals}</div>
            </div>
        );
    }
}

export default HospitalList;