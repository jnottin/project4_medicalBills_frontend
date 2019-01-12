import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import axios from "axios";
import ReactTable from 'react-table'

import './UserMedicalBills.css'

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION

class UserMedicalBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProcedures: 'empty'
        };
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
        // if (this.props.isLoggedIn !== true) {
        //     return <Redirect to='/' />
        // }



        var userProcedures = this.state.userProcedures
        if (userProcedures !== 'empty') {

            const data = userProcedures.userProcedures
            const columns = [{
                Header: 'Hospital Name',
                accessor: 'hospital_name'
            }, {
                Header: 'Hospital Address',
                accessor: 'hospital_address',
            }, {
                Header: 'Name of Procedure',
                accessor: 'name_of_procedure'
            }, {
                Header: 'Cost of Procedure',
                accessor: 'cost'
            }, {
                Header: 'Date Of Procedure',
                accessor: 'date_of_procedure'
            }
                // }, {
                //     id: '_id',
                //     Header: 'Delete Procedure',
                //     accessor: <button>Delete</button>
                // }
            ]



            console.log(userProcedures)
            let userProcedureslist = userProcedures.userProcedures.map(userProcedure => {
                return (
                    <div key={userProcedure._id}>
                        <ul className="nav-ul-indBill">
                            <li><h3>{userProcedure.hospital_name}</h3></li>
                            <li><h4>Hospital Address: {userProcedure.hospital_address}</h4></li>
                            <li><h4>Procedure: {userProcedure.name_of_procedure}</h4></li>
                            <li><h4>Cost of Procedure: {userProcedure.cost}</h4></li>
                            <li><h4>Date: {userProcedure.date_of_procedure}</h4></li>
                            <li><button>Edit Medical Bill Info</button></li>
                            <li><button>Delete Medical Bill</button></li>
                        </ul>
                    </div>
                );
            });

            return (
                <div className="hosp-grid" >
                    <h1 className="userPageTitle">User Medical Bills</h1>
                    < ReactTable
                        data={data}
                        columns={columns}
                    />
                    <div className="nav-ul-totalTable">
                        <div >
                            <ul className="nav-ul-titleRow">
                                <li><h4>Hospital Name</h4></li>
                                <li><h4>Hospital Address</h4></li>
                                <li><h4>Procedure</h4></li>
                                <li><h4>Cost of Procedure</h4></li>
                                <li><h4>Date of Procedure</h4></li>
                            </ul>
                        </div>
                        <div className="hosp-content">{userProcedureslist}</div>
                    </div>
                </div>
            );

        } else {
            return <h1>User Medical Bills</h1>;
        }
    }
}

export default UserMedicalBills