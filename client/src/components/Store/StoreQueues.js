import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import StoreQueuesTable from './StoreQueuesTable';
import { withRouter } from 'react-router-dom';


class StoreQueues extends React.Component {

  render() {
    const { location, classes, userType, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname} userType={userType} isLoggedIn={isLoggedIn}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.titleText}>
          Current Queues
        </Typography>

        <StoreQueuesTable {...this.props}/>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(StoreQueues));
