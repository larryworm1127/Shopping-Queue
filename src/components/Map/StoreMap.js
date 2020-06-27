import React from 'react';
import NavBar from '../Nav/navbar';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';


class StoreMap extends React.Component {

  render() {
    const {
      location
    } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>
      </React.Fragment>
    );
  }
}

export default withRouter(StoreMap);
