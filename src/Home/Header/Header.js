import React, { Component } from 'react';
import './Header.css';
import HomeTest from '../../HomeTest'


class Header extends Component {
    login() {
        this.props.auth.login();
    }
    weDoShadow = () => {
        if (document.getElementById("we-do").style.boxShadow === "none") {
            document.getElementById("we-do").style.boxShadow = "0 0 200px #61dafb";
        } else {
            document.getElementById("we-do").style.boxShadow = "none";
        }
    }

    render() {
        return (
            <div>
                <ul className="nav-ul">
                    <li><img src='https://i.imgur.com/sfcnr2e.png' alt="Heart Logo" className="logo" /></li>
                    <li><a className="nav-item" onClick={this.weDoShadow} href="#">What We Do</a></li>
                    <li><a className="nav-item" href="/#search-near-you">Find Prices Near You</a></li>
                    <li><a className="header-title" href="/home">Medi-Share</a></li>
                    <li><a className="nav-item submit-new" href="/submitCost">Submit Your Own Medical Bill</a></li>
                    {/* <li><HomeTest /></li> */}
                </ul>
            </div>
        );
    }

}

export default Header;