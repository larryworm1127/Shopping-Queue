import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';


class StoreQueues extends React.Component {

  render() {
    const { location } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>

        <Typography variant='h3' align='center'>
          Current Queues
        </Typography>
      </React.Fragment>
    );
  }
}

export default StoreQueues;
