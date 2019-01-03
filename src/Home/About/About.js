import React, { Component } from 'react';
import './About.css';

class About extends Component {

    render() {
        return (
            <div id="about-page" className="about-page-class closed">
                <h2 className="about-page-title">Hello</h2>
                <p className="about-page-content">Medi-Share is a medical bill sharing app where users can see the average prices that real patients had to pay for different medical procedures. We want to bring transparency to prices in the medical community. You can check prices as well as submit prices you have had to pay to help grow our ever-expanding database and help more people like yourself!</p>
            </div>
        );
    }
}



export default About;