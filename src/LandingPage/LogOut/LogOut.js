import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './LogOut.css'

class LogOut extends Component {

    render() {
        if (this.props.redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h2>Log Out</h2>

                <form>
                    <input value="Log Out" type="submit" onClick={this.props.handleLogOut} />
                </form>
            </div>
        )
    }
}

export default LogOut