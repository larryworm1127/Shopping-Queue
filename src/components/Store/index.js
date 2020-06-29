import React from 'react'
import { withRouter, useParams } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';


class StoreDetail extends React.Component {

  render() {
    const { id } = useParams();
    const { location } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>
      </React.Fragment>
    )
  }
}

export default withRouter(StoreDetail);
