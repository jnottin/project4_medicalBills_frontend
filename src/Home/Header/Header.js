import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div>
                <span className="header-content">
                    <img src="/images/whitecross.jpg" alt="Heart Logo" className="logo" />
                    {/* <img src='https://i.imgur.com/3Ukkkh9.png' alt="Heart Logo" className="logo" /> */}
                    <h1 className="header-title"><a className="header-title-link" href="/"> Medical Costs</a></h1>
                </span>
            </div>
        );
    }
}

export default Header;