import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import axios from "axios";

import './UserMedicalBills.css'

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION

class UserMedicalBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userHospitals: 'empty'
        };
    }

    componentDidMount() {
        // this.props.getUserMedicalBills()
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
        // if (this.props.isLoggedIn != true) {
        //     return <Redirect to='/' />
        // }

        var userHospitals = this.state.userHospitals

        if (userHospitals !== 'empty') {
            console.log(userHospitals)
            let userHospitalslist = userHospitals.userHospitals.map(userHospital => {
                //     userHospital.procedure.map(procedure => {
                //         if (procedure !== []) {
                //             procedure.foreach(function (price) {
                //                 return (
                //                     <div key={userHospital._id}>
                //                         <h3> - {userHospital.name}</h3>
                //                         <h4>Address: {userHospital.address}</h4>
                //                         <h3> {procedure} - {price}</h3>
                //                         <button>Edit Medical Bill Information</button>
                //                         <button>Delete Medical Bill</button>
                //                     </div>
                //                 );
                //             })
                //         }
                //     });
                // })


                return (
                    <div key={userHospital._id}>
                        <h3> - {userHospital.name}</h3>
                        <h4>Address: {userHospital.address}</h4>
                    </div>
                );
            });

            return (
                <div className="hosp-grid" >
                    <h1>User Medical Bills</h1>
                    <div className="hosp-content">{userHospitalslist}</div>
                </div>
            );

        } else {
            return <h1>No Medical Bills For User</h1>;
        }
    }
}

export default UserMedicalBills