import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './style';
import { withRouter } from 'react-router-dom';
import QueuesTable from './QueuesTable';


class StoreQueues extends React.Component {

  render() {
    const { classes, userType, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <NavBar userType={userType} isLoggedIn={isLoggedIn}/>
        <CssBaseline/>

        <Typography variant='h3' align='center' className={classes.header}>
          Current Queues
        </Typography>

        <QueuesTable {...this.props} isStore={true}/>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(StoreQueues));
