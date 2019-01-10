import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Header from './Home/Header/Header.js'
import Home from './Home.js'
import HomeTest from './HomeTest.js'
import NewMedicalBill from "./Home/NewMedicalBill/NewMedicalBill";
// import Auth from './Auth/Auth.js';
import { Navbar, Button } from 'react-bootstrap';

// const auth = new Auth();
// auth.login();


class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <Header />
        {/* <Route path="/home" exact component={HomeTest} /> */}
        <Route path="/home" exact component={Home} />
        <Route path="/submitCost" component={NewMedicalBill} />
        <Navbar fluid>
          <Navbar.Header>
            {
              !isAuthenticated() && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}
export default App;