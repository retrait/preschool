import React, { Component } from "react";
import "./styles/Home.css";
import DashItem from "../components/dashitem";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }
  render() {
    return (
      <div className="App">
        <DashItem />
      </div>
    );
  }
}

export default Home;
