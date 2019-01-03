import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div>
                <ul className="footer-nav-ul">
                    <li><img src='https://i.imgur.com/sfcnr2e.png' alt="Heart Logo" className="logo" /></li>
                    {/* <li><button className="nav-item" onClick={this.aboutPageSlide}>What We Do</button></li> */}
                    <li><a href="/#search-near-you">What We Do</a></li>
                    <li><a href="/#search-near-you">Find Costs Near You</a></li>
                    <li><a href="/">Medi-Share</a></li>
                    <li><a href="/submitCost">Submit Your Own Medical Bill</a></li>
                    <li><img src='https://i.imgur.com/sfcnr2e.png' alt="Heart Logo" className="logo" /></li>
                </ul>
            </div>
        );
    }
}

export default Footer;