import React, { Component } from 'react';
import './HospitalList.css';
import axios from "axios";



class HospitalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals: [],
        };
    }
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
    render() {
        const hospitals = this.state.hospitals.map(hospital => {
            return (
                <div key={hospital._id} className="specific-hospital">
                    <h3>{hospital.name}</h3>
                    <h4>Address: {hospital.address}</h4>
                    <h4>Latitude: {hospital.lat}</h4>
                    <h4>Longitude: {hospital.long}</h4>
                </div>
            );
        });

        return (
            <div className="hosp-grid">
                <h2 className="hosp-title">Hospital List</h2>
                <div className="hosp-content">{hospitals}</div>
            </div>
        );
    }
}

export default HospitalList;