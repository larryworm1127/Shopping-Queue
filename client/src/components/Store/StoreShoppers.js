import React from 'react';
import NavBar from '../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { styles } from './style';
import { Typography, withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import { getAllQueuesforStore, getTodayQueuesforStore } from '../../actions/store'

class StoreShoppers extends React.Component {

  state = {
    TotalShoppers: 0,
    TotalShoppersToday: 0,
    NumberofShoppersinStore: 0,
    NumberofShoppersinQueue: 0,
    AverageWaitTime: 0,
  }

  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    getAllQueuesforStore(this.props.currentUser, this);
    getTodayQueuesforStore(this.props.currentUser, this);
  }
  render() {
    const { classes, userType, isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <NavBar userType={userType} isLoggedIn={isLoggedIn} />
        <CssBaseline />

        <Typography variant='h3' align='center' className={classes.titleText}>
          Shoppers Stats
        </Typography>

        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paperStats}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Total Shoppers
                </Typography>

                <Typography component="p" variant="h6">
                  {this.state.TotalShoppers}
                </Typography>

                <Typography color="textSecondary" className={classes.secondaryText}>
                  up until 15 March, 2019
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paperStats}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Total Shoppers Today
                </Typography>

                <Typography component="p" variant="h6">
                  {this.state.TotalShoppersToday}
                </Typography>

                <Typography color="textSecondary" className={classes.secondaryText}>
                  on 15 March, 2019
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paperStats}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Number of Shoppers in Store
                </Typography>

                <Typography component="p" variant="h6">
                  {this.state.NumberofShoppersinStore}
                </Typography>

                <Typography color="textSecondary" className={classes.secondaryText}>
                  on 15 March, 2019
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paperStats}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Number of Shoppers in Queue
                </Typography>

                <Typography component="p" variant="h6">
                  {this.state.NumberofShoppersinQueue}
                </Typography>

                <Typography color="textSecondary" className={classes.secondaryText}>
                  on 15 March, 2019
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paperStats}>
                <Typography component="h2" variant="h5" color="primary" gutterBottom>
                  Average Wait Time
                </Typography>

                <Typography component="p" variant="h6">
                  {this.state.AverageWaitTime} Minutes
                </Typography>

                <Typography color="textSecondary" className={classes.secondaryText}>
                  on 15 March, 2019
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(StoreShoppers));
