import React from "react";
import NavBar from "../navbar";

/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <NavBar currentPath={this.props.location.pathname}/>
    );
  }
}

export default Home;
