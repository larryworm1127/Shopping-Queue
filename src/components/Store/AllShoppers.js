import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';


class AllShoppers extends React.Component {

  render() {
    const { location } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>
      </React.Fragment>
    );
  }
}

export default AllShoppers
