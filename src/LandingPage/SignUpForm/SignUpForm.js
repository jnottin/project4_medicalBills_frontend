import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './SignUpForm.css'

class SignUpForm extends Component {
    render() {
        if (this.props.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h2>Sign Up</h2>

                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" onChange={this.props.handleInput} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" onChange={this.props.handleInput} />
                    </div>
                    <input value="Submit" type="submit" onClick={this.props.handleSignUp} />
                </form>
            </div>
        )
    }
}

export default SignUpForm