import React from "react";
import NavBar from "../navbar";


class Profile extends React.Component {

  render() {
    return (
      <NavBar currentPath={this.props.location.pathname}/>
    )
  }
}

export default Profile;
