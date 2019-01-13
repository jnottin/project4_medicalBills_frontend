import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        let loginOrOut = []
        let seeYourMed = []
        if (this.props.isLoggedIn) {
            seeYourMed.push(<li key='submit-your-bills'><a href='/submitCost' className="float-left nav-item li-a">Submit Your Medical Bill</a></li>)
            seeYourMed.push(<li key='see-your-bills'><a href='/userInfo' className="float-left nav-item li-a">See Your Medical Bills</a></li>)
            loginOrOut.push(<li key='logout' className="float-left"><a href='/logout' className="nav-item li-a">Log Out</a></li>)
        } else {
            loginOrOut.push(<li key='signup' className="float-left"><a href='/signup' className="nav-item li-a">Sign Up</a></li>)
            loginOrOut.push(<li key='login' className="float-left"><a href='/login' className="nav-item li-a">Log In</a></li>)
        }

        return (
            <div>
                <ul id="pageTop" className="nav-ul">
                    <li><img className="float-left logo" src='https://i.imgur.com/sfcnr2e.png' alt="Heart Logo" /></li>
                    <li><a className="float-left header-title li-a" href="/">Medi-Share</a></li>
                    <li><a className="float-left nav-item li-a" href="/#search-near-you">Find Prices Near You</a></li>
                    {/* <li><a className="float-left nav-item li-a" href="/submitCost">Submit Medical Bill</a></li> */}
                    {seeYourMed}
                    <div className="float-right">
                        {loginOrOut}
                    </div>
                </ul>
            </div>
        );
    }

}

export default Header;