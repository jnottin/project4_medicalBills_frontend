import React, { Component } from 'react';
import './EditMedicalBill.css';
import { Redirect } from 'react-router'
import axios from "axios";

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION


class EditMedicalBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProcedures: [],
            name: "",
            address: "",
            // eventually will need to think about lat/long if hosp changes
            // lng: "",
            // lat: "",
            cost: "",
            procedure_selected: '',
            date_of_procedure: '',
            redirect: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
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

    setTheStateForInputs(userProcedure) {
        this.setState({
            name: userProcedure.hospital_name,
            address: userProcedure.hospital_address,
            cost: userProcedure.cost,
            procedure_selected: userProcedure.name_of_procedure,
            date_of_procedure: userProcedure.date_of_procedure,
        })

    }

    handleChangeDropdown(event) {
        this.setState({ procedure_selected: event.target.value });
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    handleEdit(e) {
        e.preventDefault();
        console.log(this.props.match.params._id);
        axios
            .put(
                "http://roomkind.herokuapp.com/editShelter/" +
                this.props.match.params.id,
                {
                    // .put("http://localhost:3010/editShelter/" + this.props.match.params.id, {

                    name: this.state.name,
                    location: this.state.location,
                    beds: this.state.beds,
                    image: this.state.image
                }
            )
            .then(result => { });
    }

    handleRemove(e) {
        e.preventDefault();
        console.log(this.props.match.params.id);
        axios
            .delete(
                //Somehow its going wrong here
                toggleBackendLink + '/deleteMedicalBill/' + this.props.match.params.id
            )
            .then(result => {
                this.setState({ redirect: true });
            });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/userInfo' />
        }

        // const userProcedures = this.state.userProcedures.userProcedures;
        const userProcedures = this.props.userProcedures.userProcedures;
        console.log(userProcedures)
        if (typeof userProcedures != 'undefined') {
            const userProcedureId = this.props.match.params.id;
            const userProceduresInfo = userProcedures.filter(specificProcedure => specificProcedure._id === userProcedureId);
            const userProcedure = userProceduresInfo[0];
            console.log(userProcedure)
            return (
                <div className="allEditMedical">
                    {/* <form>
                        <p>
                            <label className="newBill-label" htmlFor="name">Name of Hospital Where Procedure Took Place: </label> <br />
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                placeholder="Name Of Hospital"
                            />
                        </p>
                        <p>
                            <label className="newBill-label" htmlFor="name">Hospital Address: </label> <br />
                            <input
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}
                                placeholder="Hospital Address"
                            />
                        </p>
                        <p className="typeOfProcedure-content">
                            <label className="newBill-label" htmlFor="typeOfProcedure">Type of Procedure: </label> <br />
                            <select name="typeOfProcedure" onChange={this.handleChangeDropdown} value={this.state.value} id="procedure-dropdn">
                                <option value="Select A Procedure">Select A Procedure</option>
                                <option value="appendectomy_cost">Appendectomy</option>
                                <option value="breast_biopsy_cost">Breast Biopsy</option>
                                <option value="carotid_endarterectomy_cost">Carotid Endarterectomy</option>
                                <option value="cataract_surgery_cost">Cataract Surgery</option>
                                <option value="cesarean_section_cost">Cesarean Section</option>
                                <option value="coronary_artery_bypass_cost">Coronary Artery Bypass</option>
                                <option value="debridement_of_wound_cost">Debridement of Wound</option>
                                <option value="free_skin_graft_cost">Free Skin Graft</option>
                                <option value="spinal_fusion_cost">Spinal Fusion</option>
                                <option value="total_hip_replacement_cost">Total Hip Replacement</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor="cost">Cost of Procedure: </label> <br />
                            <input
                                type="number"
                                name="cost"
                                value={this.state.cost}
                                onChange={this.handleInputChange}
                                placeholder="Cost of Procedure"
                            />
                        </p>
                        <p>
                            <label className="newBill-label" htmlFor="date">Date Of Procedure: </label> <br />
                            <input
                                type="text"
                                name="date_of_procedure"
                                value={this.state.date_of_procedure}
                                onChange={this.handleInputChange}
                                placeholder="Date of Procedure"
                            />
                        </p>
                        <div>
                            <button type="submit" onClick={this.handleEdit}>
                                Done With Change!
                                </button> */}

                    <div className="EditMedical-title">
                        <h1 >Delete This Medical Bill?</h1>
                        <p className="editMedicalBill-p">If you want to edit your medical bill, simply delete it and re-submit it.</p>
                    </div>
                    <h3>Hospital Name: {userProcedure.hospital_name}</h3>
                    <h3>Hospital Adress: {userProcedure.hospital_address}</h3>
                    <h3>Procedure Name: {userProcedure.name_of_procedure}</h3>
                    <h3>Cost Of Procedure: ${userProcedure.cost}</h3>
                    <h3>Date Of Procedure: {userProcedure.date_of_procedure}</h3>
                    <button className="EditMedSubmit" type="submit" onClick={this.handleRemove}>
                        Delete Medical Bill
                            </button>
                </div>
                //     </form>
                // </div>
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