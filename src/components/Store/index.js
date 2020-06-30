import React from 'react';
import { withRouter, } from 'react-router-dom';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { stores } from '../../utils/stores';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { styles } from './style';


class StoreDetail extends React.Component {

  render() {
    const { match, classes } = this.props;
    const store = stores[match.params.id];

    return (
      <React.Fragment>
        <NavBar/>
        <CssBaseline/>

        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              {store.name}
            </Typography>
          </Paper>
        </div>

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(StoreDetail));
