import React, { Component } from 'react';
import './HospitalList.css';


class HospitalList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalName: 'Hospital List',
        };
        this.OpenAccordion = this.OpenAccordion.bind(this);
    }

    OpenAccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }


    render() {
        const hospitalsProp = this.props.hospitals
        function sortHospByLowestCost() {
            hospitalsProp.sort(function (a, b) { return a.cost - b.cost });
        }
        sortHospByLowestCost()

        const hospitals = this.props.hospitals.map((hospital, ind) => {
            // // var proceduresList = ["appendectomy_cost", "carotid_endarterectomy_cost",
            // //     "coronary_artery_bypass_cost", "total_hip_replacement_cost", "cesarean_section_cost", "free_skin_graft_cost",
            // //     "spinal_fusion_cost", "breast_biopsy_cost", "debridement_of_wound_cost"]

            // // var averageCost = []

            // // for (var i = 0; i < proceduresList.length; i++) {
            // //     var total_cost = 0;
            // //     for (var i = 0; i < hospital.proceduresList[i].length; i++) {
            // //         total_cost += hospital.proceduresList[i];
            // //     }
            // //     var avg_cost = total_cost / hospital.proceduresList[i].length;
            // //     averageCost.push(avg_cost)
            // // }
            if (hospital.appendectomy_cost.length === 0) {
                var avg_appendectomy_cost = 'No Bills Added Yet!'
                // document.getElementById("procedure_item").style.display = 'none';
            } else {
                var total_appendectomy_cost = 0;
                for (var i = 0; i < hospital.appendectomy_cost.length; i++) {
                    total_appendectomy_cost += hospital.appendectomy_cost[i];
                }
                var avg_appendectomy_cost_dol = total_appendectomy_cost / hospital.appendectomy_cost.length;
                var avg_appendectomy_cost = avg_appendectomy_cost_dol.toString()
            }

            if (hospital.cataract_surgery_cost.length === 0) {
                var avg_cataract_surgery_cost = 'No Bills Added Yet!'
            } else {
                var total_cataract_surgery_cost = 0;
                for (i = 0; i < hospital.cataract_surgery_cost.length; i++) {
                    total_cataract_surgery_cost += hospital.cataract_surgery_cost[i];
                }
                var avg_cataract_surgery_cost = total_cataract_surgery_cost / hospital.cataract_surgery_cost.length;
            }

            if (hospital.carotid_endarterectomy_cost.length === 0) {
                var avg_carotid_endarterectomy_cost = 'No Bills Added Yet!'
            } else {
                var total_carotid_endarterectomy_cost = 0;
                for (i = 0; i < hospital.carotid_endarterectomy_cost.length; i++) {
                    total_carotid_endarterectomy_cost += hospital.carotid_endarterectomy_cost[i];
                }
                var avg_carotid_endarterectomy_cost = total_carotid_endarterectomy_cost / hospital.carotid_endarterectomy_cost.length;
            }
            if (hospital.coronary_artery_bypass_cost.length === 0) {
                var avg_coronary_artery_bypass_cost = 'No Bills Added Yet!'
            } else {
                var total_coronary_artery_bypass_cost = 0;
                for (i = 0; i < hospital.coronary_artery_bypass_cost.length; i++) {
                    total_coronary_artery_bypass_cost += hospital.coronary_artery_bypass_cost[i];
                }
                var avg_coronary_artery_bypass_cost = total_coronary_artery_bypass_cost / hospital.coronary_artery_bypass_cost.length;
            }

            if (hospital.total_hip_replacement_cost.length === 0) {
                var avg_total_hip_replacement_cost = 'No Bills Added Yet!'
            } else {
                var total_total_hip_replacement_cost = 0;
                for (i = 0; i < hospital.total_hip_replacement_cost.length; i++) {
                    total_total_hip_replacement_cost += hospital.total_hip_replacement_cost[i];
                }
                var avg_total_hip_replacement_cost = total_total_hip_replacement_cost / hospital.total_hip_replacement_cost.length;
            }

            if (hospital.cesarean_section_cost.length === 0) {
                var avg_cesarean_section_cost = 'No Bills Added Yet!'
            } else {
                var total_cesarean_section_cost = 0;
                for (i = 0; i < hospital.cesarean_section_cost.length; i++) {
                    total_cesarean_section_cost += hospital.cesarean_section_cost[i];
                }
                var avg_cesarean_section_cost = total_cesarean_section_cost / hospital.cesarean_section_cost.length;
            }

            if (hospital.free_skin_graft_cost.length === 0) {
                var avg_free_skin_graft_cost = 'No Bills Added Yet!'
            } else {
                var total_free_skin_graft_cost = 0;
                for (i = 0; i < hospital.free_skin_graft_cost.length; i++) {
                    total_free_skin_graft_cost += hospital.free_skin_graft_cost[i];
                }
                var avg_free_skin_graft_cost = total_free_skin_graft_cost / hospital.free_skin_graft_cost.length;
            }

            if (hospital.spinal_fusion_cost.length === 0) {
                var avg_spinal_fusion_cost = 'No Bills Added Yet!'
            } else {
                var total_spinal_fusion_cost = 0;
                for (i = 0; i < hospital.spinal_fusion_cost.length; i++) {
                    total_spinal_fusion_cost += hospital.spinal_fusion_cost[i];
                }
                var avg_spinal_fusion_cost = total_spinal_fusion_cost / hospital.spinal_fusion_cost.length;
            }

            if (hospital.breast_biopsy_cost.length === 0) {
                var avg_breast_biopsy_cost = 'No Bills Added Yet!'
            } else {
                var total_breast_biopsy_cost = 0;
                for (i = 0; i < hospital.breast_biopsy_cost.length; i++) {
                    total_breast_biopsy_cost += hospital.breast_biopsy_cost[i];
                }
                var avg_breast_biopsy_cost = total_breast_biopsy_cost / hospital.breast_biopsy_cost.length;
            }

            if (hospital.debridement_of_wound_cost.length === 0) {
                var avg_debridement_of_wound_cost = 'No Bills Added Yet!'
            } else {
                var total_debridement_of_wound_cost = 0;
                for (i = 0; i < hospital.debridement_of_wound_cost.length; i++) {
                    total_debridement_of_wound_cost += hospital.debridement_of_wound_cost[i];
                }
                var avg_debridement_of_wound_cost = total_debridement_of_wound_cost / hospital.debridement_of_wound_cost.length;
            }

            // var currentHospital = {
            //     avg_breast_biopsy_cost : avg_breast_biopsy_cost,

            // }

            const index = ind + 1;
            return (
                <div key={hospital._id} className="specific-hospital">
                    <h3>({index.toString()}) - {hospital.name}</h3>
                    <h4 className="hospital-address">Address: {hospital.address}</h4>
                    <button className="accordion" onClick={this.OpenAccordion}>See Prices Per Procedure</button>
                    <div className="panel">
                        <ul>
                            <li className="procedure_item">Appendectomy Cost: ${avg_appendectomy_cost}</li>
                            <li>Breast Biopsy Cost: ${avg_breast_biopsy_cost}</li>
                            <li>Carotid Endarterectomy Cost: ${avg_carotid_endarterectomy_cost}</li>
                            <li>Cataract Surgery Cost: ${avg_cataract_surgery_cost}</li>
                            <li>Cesarean Section Cost: ${avg_cesarean_section_cost}</li>
                            <li>Coronary Artery Bypass Cost: ${avg_coronary_artery_bypass_cost}</li>
                            <li>Debridement of Wound Cost: ${avg_debridement_of_wound_cost}</li>
                            <li>Free Skin Graft Cost: ${avg_free_skin_graft_cost}</li>
                            <li>Spinal Fusion Cost: ${avg_spinal_fusion_cost}</li>
                            <li>Total Hip Replacement Cost: ${avg_total_hip_replacement_cost}</li>
                        </ul>
                    </div>
                </div>
            );
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