import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import StoreQueuesTable from './StoreQueuesTable';


class StoreQueues extends React.Component {

  render() {
    const { location, classes } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          Current Queues
        </Typography>

        <StoreQueuesTable/>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StoreQueues);
