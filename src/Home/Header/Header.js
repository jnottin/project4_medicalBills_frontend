import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        let loginOrOut = []
        if (this.props.isLoggedIn) {
            loginOrOut.push(<li key='see-your-bills'><a href='/userInfo' className="nav-item">See Your Medical Bills</a></li>)
            loginOrOut.push(<li key='logout'><a href='/logout' className="nav-item">Log Out</a></li>)
        } else {
            loginOrOut.push(<li key='signup'><a href='/signup' className="nav-item">Sign Up</a></li>)
            loginOrOut.push(<li key='login'><a href='/login' className="nav-item">Log In</a></li>)
        }

        return (
            <div>
                <ul id="pageTop" className="nav-ul">
                    <li><img className="logo" src='https://i.imgur.com/sfcnr2e.png' alt="Heart Logo" /></li>
                    <li><a className="nav-item" href="/#search-near-you">Find Prices Near You</a></li>
                    <li><a className="nav-item" href="/submitCost">Submit Medical Bill</a></li>
                    <li><a className="header-title" href="/">Medi-Share</a></li>

                    <div className="float-right">
                        {loginOrOut}
                    </div>
                </ul>
            </div>
        );
    }

}

export default Header;