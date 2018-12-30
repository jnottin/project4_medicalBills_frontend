import React, { Component } from 'react';
import './HospitalList.css';


class HospitalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalName: 'Hospital List',
        };
    }

    render() {
        const hospitalsProp = this.props.hospitals
        function sortHospByLowestCost() {
            hospitalsProp.sort(function (a, b) { return a.cost - b.cost });
        }
        sortHospByLowestCost()



        var arrayOfProcedures = []

        const hospitals = this.props.hospitals.map((hospital, i) => {
            var hospital_procedures = hospital.hospital_procedures
            // if (hospital_procedures.length > 0) {
            //     for (var i = 0; i < hospital.procedures.length; i++) {
            //         arrayOfProcedures.push(hospital.procedures.name_of_procedure)
            //     }
            //     console.log(arrayOfProcedures)
            //     const index = i + 1;
            //     return (
            //         <div key={hospital._id} className="specific-hospital">
            //             <h3>({index.toString()}) - {hospital.name}</h3>
            //             <h4>Address: {hospital.address}</h4>
            //             <h4>Latitude: {hospital.lat}</h4>
            //             <h4>Longitude: {hospital.lng}</h4>
            //             <h4>Cost: ${hospital.cost}</h4>
            //         </div>
            //     );
            // } else {
            const index = i + 1;
            return (
                <div key={hospital._id} className="specific-hospital">
                    <h3>({index.toString()}) - {hospital.name}</h3>
                    <h4>Address: {hospital.address}</h4>
                    <h4>Latitude: {hospital.lat}</h4>
                    <h4>Longitude: {hospital.lng}</h4>
                    <h4>Cost: ${hospital.cost}</h4>
                </div>
            );
            // }
        });

        return (
            <div className="hosp-grid" >
                <div>
                    <h2 className="hosp-title">{this.state.hospitalName}</h2>
                </div>
                <div className="hosp-content">{hospitals}</div>
            </div>
        );
    }
}

export default HospitalList;