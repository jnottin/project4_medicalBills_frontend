import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    aboutPageSlide = () => {
        if (document.getElementById("about-page").style.width === "30%") {
            document.getElementById("about-page").style.width = "0";
            console.log(document.getElementById("about-page").style.width)
        } else {
            document.getElementById("about-page").style.width = "30%";
            console.log(document.getElementById("about-page").style.width)
        }
    };
    render() {
        return (
            <div>
                <ul className="nav-ul">
                    <li><img src='https://i.imgur.com/sfcnr2e.png' alt="Heart Logo" className="logo" /></li>
                    {/* <li><button className="nav-item" onClick={this.aboutPageSlide}>What We Do</button></li> */}
                    <li><a className="nav-item" href="/#search-near-you">What We Do</a></li>
                    <li><a className="nav-item" href="/#search-near-you">Find Costs Near You</a></li>
                    <li><a className="header-title" href="/">Medi-Share</a></li>
                    <li><a className="nav-item submit-new" href="/submitCost">Submit Your Own Medical Bill</a></li>
                </ul>
            </div>
        );
    }
}

export default Header;