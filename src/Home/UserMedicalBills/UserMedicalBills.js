import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from "axios";

import './UserMedicalBills.css'

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION

class UserMedicalBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userHospitals: ''
        };
    }

    componentDidMount() {
        console.log(localStorage.token)
        axios
            .get(toggleBackendLink + "/userHospitals", {
                headers: {
                    authorization: 'Bearer ' + localStorage.token
                }
            })
            .then(res => {
                this.setState({
                    userHospitals: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        if (this.props.redirect === true) {
            return <Redirect to='/' />
        }
        console.log(this.state.userHospitals)
        // const userHospitals = this.state.userHospitals.map(hospital => {

        return (
            <div>
                <h1>User Medical Bills</h1>
            </div>
            // <div key={hospital._id} className="specific-hospital">
            //     <h3>({index.toString()}) - {hospital.name}</h3>
            //     <h4 className="hospital-address">Address: {hospital.address}</h4>
            //     <button className="accordion">See Average Prices Per Procedure</button>
            //     <div className="panel">
            //         <ul>
            //             <li className="procedure_item">Appendectomy Cost: ${hospital.appendectomy_cost}</li>
            //         </ul>
            //     </div>
            // </div>
        );
        // });

        // return (
        //     <div className="hosp-grid" >
        //         <div className="hosp-content">{userHospitals}</div>
        //     </div>
        // );
    }
}

export default UserMedicalBills