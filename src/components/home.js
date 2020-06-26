import React from 'react';
import NavBar from './Nav/navbar';
import { withRouter } from 'react-router-dom';

/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <NavBar currentPath={this.props.location.pathname}/>
    );
  }
}

export default withRouter(Home);
