import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from './Home/Header/Header.js'
import Home from './Home.js'
import NewMedicalBill from "./Home/NewMedicalBill/NewMedicalBill";
import axios from "axios";
import LogInForm from './LandingPage/LogInForm/LogInForm.js'
import SignUpForm from './LandingPage/SignUpForm/SignUpForm.js'
import LogOut from './LandingPage/LogOut/LogOut'
import UserMedicalBills from "./Home/UserMedicalBills/UserMedicalBills";

const toggleBackendLink = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEVELOPMENT : process.env.REACT_APP_PRODUCTION



class App extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      redirect: false,
      userHospitals: '',
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
  }


  componentDidMount() {
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      this.setState({
        isLoggedIn: false
      })
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignUp(e) {
    e.preventDefault()
    axios.post(toggleBackendLink + '/signup', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.token = response.data.token
        this.setState({
          isLoggedIn: true,
          redirect: true
        })
      })
      .catch(err => console.log(err))
  }

  handleLogOut() {
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false,
      redirect: true
    })
    localStorage.clear()
  }

  handleLogIn(e) {
    e.preventDefault()
    axios.post(toggleBackendLink + '/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.token = response.data.token
        this.setState({
          isLoggedIn: true,
          redirect: true
        })
      })
      .catch(err => console.log(err))
  }


  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path="//"
            render={(props) => {
              return (
                <Home isLoggedIn={this.state.isLoggedIn} />
              )
            }} />

          <Route exact path='/signup/'
            render={(props) => {
              return (
                <SignUpForm isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleSignUp={this.handleSignUp} redirect={this.state.redirect} />
              )
            }}
          />
          <Route exact path='/logout/'
            render={(props) => {
              return (
                <LogOut isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut} redirect={this.state.redirect} />
              )
            }}
          />

          <Route exact path='/login/'
            render={(props) => {
              return (
                <LogInForm isLoggedIn={this.state.isLoggedIn} handleInput={this.handleInput} handleLogIn={this.handleLogIn} redirect={this.state.redirect} />
              )
            }}
          />
          <Route exact path='/submitCost/'
            render={(props) => {
              return (
                <NewMedicalBill isLoggedIn={this.state.isLoggedIn} />
              )
            }}
          />
          <Route exact path='/userInfo/'
            render={(props) => {
              return (
                <UserMedicalBills isLoggedIn={this.state.isLoggedIn} />
              )
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default App;