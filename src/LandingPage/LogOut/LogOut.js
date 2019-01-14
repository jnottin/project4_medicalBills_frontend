import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './LogOut.css'

class LogOut extends Component {

    render() {
        if (this.props.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div className="allSignUp logout-all">
                <h1 className="SignUp-title">Log Out</h1>
                <p className="logOutText">Are you sure you want to Log Out?</p>
                <form>
                    <input className="signUpSubmit logOutSubmit" value="Log Out" type="submit" onClick={this.props.handleLogOut} />
                </form>
            </div>
        )
    }
}

export default LogOut