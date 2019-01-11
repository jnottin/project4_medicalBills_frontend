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
        console.log(this.state.userHospitals)

        if (this.props.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1>USER MEDICAL BILLS</h1>
            </div>
        )
    }
}

export default UserMedicalBills