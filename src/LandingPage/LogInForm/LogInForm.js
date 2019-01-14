import React, { Component } from 'react'
import { Redirect } from 'react-router'

import './LogInForm.css'

class LogInForm extends Component {
    render() {
        if (this.props.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div className="allSignUp">
                <h1 className="SignUp-title">Log In</h1>
                <form >
                    <div className="signUpInput">
                        <label htmlFor="email">Email: </label><br />
                        <input type="text" name="email" onChange={this.props.handleInput} />
                    </div>

                    <div className="signUpInput">
                        <label htmlFor="password">Password: </label><br />
                        <input type="text" name="password" onChange={this.props.handleInput} />
                    </div>
                    <input className="signUpSubmit" value="Submit" type="submit" onClick={this.props.handleLogIn} />
                </form>
            </div>
        )
    }
}

export default LogInForm