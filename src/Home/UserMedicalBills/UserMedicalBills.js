import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import axios from "axios";
import ReactTable from 'react-table'
import { Route } from "react-router-dom";
import EditMedicalBill from "../EditMedicalBill/EditMedicalBill";

import './UserMedicalBills.css'

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION

class UserMedicalBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProcedures: 'empty',
            clickedProcedureId: '',
        };
    }

    // componentDidMount() {
    //     axios
    //         .get(toggleBackendLink + "/userProcedures", {
    //             headers: {
    //                 authorization: 'Bearer ' + localStorage.token
    //             }
    //         })
    //         .then(res => {
    //             this.setState({
    //                 userProcedures: res.data
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }


    render() {
        // if (this.props.isLoggedIn !== true) {
        //     return <Redirect to='/' />
        // }



        // var userProcedures = this.state.userProcedures
        var userProcedures = this.props.userProcedures
        if (userProcedures !== 'empty') {

            const data = userProcedures.userProcedures
            const columns = [{
                Header: 'Hospital Name',
                accessor: 'hospital_name',
            }, {
                Header: 'Hospital Address',
                accessor: 'hospital_address',
            }, {
                Header: 'Name of Procedure',
                accessor: 'name_of_procedure',
            }, {
                Header: 'Cost of Procedure',
                accessor: 'cost',
                // maxWidth: 'auto'
                maxWidth: 150,
            }, {
                Header: 'Date Of Procedure',
                accessor: 'date_of_procedure',
                maxWidth: 250,
            }
            ]

            return (
                <div className="total-content" >
                    <div className="userPageTitle">
                        <h1>User Medical Bills</h1>
                        <h3>Click on any medical bill below to go to the Edit or Delete Page</h3>
                    </div>
                    < ReactTable
                        className="-striped -highlight table"
                        data={data}
                        columns={columns}
                        defaultPageSize={10}
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    console.log("it produced this event:", e);
                                    console.log("It was in this row:", rowInfo);
                                    var id = rowInfo.original._id
                                    window.location = "/editMedicalBill/" + id;
                                }
                            }
                        }}
                    />
                </div>

            );

        } else {
            return <h1 className="userPageTitle">User Medical Bills</h1>;
        }
    }
}

export default UserMedicalBills