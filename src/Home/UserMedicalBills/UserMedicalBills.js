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
            userProcedures: 'empty',
            clickedProcedureId: '',
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

    tryFunction(rowInfo) {
        this.setState({
            clickedProcedureId: rowInfo.original._id
        })
        console.log(this.state.clickedProcedureId)
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
                // }, {
                //     id: '_id',
                //     Header: 'Delete Procedure',
                //     accessor: <button>Delete</button>
                // }
            ]

            return (
                <div className="total-content" >
                    <h1 className="userPageTitle">User Medical Bills</h1>
                    < ReactTable
                        className="-striped -highlight table"
                        data={data}
                        columns={columns}
                        defaultPageSize={10}
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                                onClick: (e, handleOriginal) => {
                                    this.tryFunction(rowInfo)
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