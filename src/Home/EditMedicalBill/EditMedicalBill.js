import React, { Component } from 'react';
import './EditMedicalBill.css';
import axios from "axios";

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION


class EditMedicalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProcedures: [],
        }
    }


    componentDidMount() {
        axios
            .get(toggleBackendLink + "/userProcedures", {
                headers: {
                    authorization: 'Bearer ' + localStorage.token
                }
            })
            .then(res => {
                this.setState({
                    userProcedures: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const userProcedures = this.state.userProcedures.userProcedures;
        if (typeof userProcedures != 'undefined') {
            const userProcedureId = this.props.match.params.id;
            const userProceduresInfo = userProcedures.filter(specificProcedure => specificProcedure._id === userProcedureId);
            const userProcedure = userProceduresInfo[0];
            return (
                <div>
                    <h1>EDIT MEDICAL BILL PAGE</h1>
                    <h2>{userProcedure.hospital_name}</h2>
                    <h2>{userProcedure.hospital_address}</h2>
                    <h2>{userProcedure.name_of_procedure}</h2>
                    <h2>{userProcedure.cost}</h2>
                    <h2>{userProcedure.date_of_procedure}</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>User Procedure Deleted, Return To Home Page</h1>
                </div>
            );
        }
    }

}

export default EditMedicalBill;