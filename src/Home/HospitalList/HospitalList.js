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

    OpenAccordion(e) {
        var panel = e.target.nextElementSibling
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }


    render() {
        const hospitals = this.props.hospitals.map((hospital, ind) => {


            const index = ind + 1;
            return (
                <div key={hospital._id} className="specific-hospital">
                    <h3>({index.toString()}) - {hospital.name}</h3>
                    <h4 className="hospital-address">Address: {hospital.address}</h4>
                    <button className="accordion" onClick={(e) => this.OpenAccordion(e)}>See Average Prices Per Procedure</button>
                    <div className="panel" id={hospital._id}>
                        <ul className="procedure_items">
                            <li className="procedure_item">Appendectomy Cost: ${hospital.avg_appendectomy_cost}</li>
                            <li className="procedure_item">Breast Biopsy Cost: ${hospital.avg_breast_biopsy_cost}</li>
                            <li className="procedure_item">Carotid Endarterectomy Cost: ${hospital.avg_carotid_endarterectomy_cost}</li>
                            <li className="procedure_item">Cataract Surgery Cost: ${hospital.avg_cataract_surgery_cost}</li>
                            <li className="procedure_item">Cesarean Section Cost: ${hospital.avg_cesarean_section_cost}</li>
                            <li className="procedure_item">Coronary Artery Bypass Cost: ${hospital.avg_coronary_artery_bypass_cost}</li>
                            <li className="procedure_item">Debridement of Wound Cost: ${hospital.avg_debridement_of_wound_cost}</li>
                            <li className="procedure_item">Free Skin Graft Cost: ${hospital.avg_free_skin_graft_cost}</li>
                            <li className="procedure_item">Spinal Fusion Cost: ${hospital.avg_spinal_fusion_cost}</li>
                            <li className="procedure_item">Total Hip Replacement Cost: ${hospital.avg_total_hip_replacement_cost}</li>
                        </ul>
                    </div>
                </div>
                // <div key={hospital._id} >
                //     <Accordion className="specific-hospital">
                //         <AccordionItem>
                //             <AccordionItemTitle>
                //                 <h3>({index.toString()}) - {hospital.name}</h3>
                //                 <h4 className="hospital-address">Address: {hospital.address}</h4>
                //             </AccordionItemTitle>
                //             <AccordionItemBody>
                //                 <div className="panel">
                //                     <ul className="procedure_items">
                //                         <li className="procedure_item">Appendectomy Cost: ${hospital.avg_appendectomy_cost}</li>
                //                         <li className="procedure_item">Breast Biopsy Cost: ${hospital.avg_breast_biopsy_cost}</li>
                //                         <li className="procedure_item">Carotid Endarterectomy Cost: ${hospital.avg_carotid_endarterectomy_cost}</li>
                //                         <li className="procedure_item">Cataract Surgery Cost: ${hospital.avg_cataract_surgery_cost}</li>
                //                         <li className="procedure_item">Cesarean Section Cost: ${hospital.avg_cesarean_section_cost}</li>
                //                         <li className="procedure_item">Coronary Artery Bypass Cost: ${hospital.avg_coronary_artery_bypass_cost}</li>
                //                         <li className="procedure_item">Debridement of Wound Cost: ${hospital.avg_debridement_of_wound_cost}</li>
                //                         <li className="procedure_item">Free Skin Graft Cost: ${hospital.avg_free_skin_graft_cost}</li>
                //                         <li className="procedure_item">Spinal Fusion Cost: ${hospital.avg_spinal_fusion_cost}</li>
                //                         <li className="procedure_item">Total Hip Replacement Cost: ${hospital.avg_total_hip_replacement_cost}</li>
                //                     </ul>
                //                 </div>
                //             </AccordionItemBody>
                //         </AccordionItem>
                //         <button className="accordion" onClick={this.OpenAccordion}>See Average Prices Per Procedure</button>
                //     </Accordion>
                // </div>
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