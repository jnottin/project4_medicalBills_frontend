import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Header from './Home/Header/Header.js'
import Home from './Home.js'
import NewMedicalBill from "./Home/NewMedicalBill/NewMedicalBill";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/submitCost" component={NewMedicalBill} />
      </div>
    );
  }
}
export default App;