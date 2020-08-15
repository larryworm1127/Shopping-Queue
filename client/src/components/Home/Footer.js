import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './style';
import { addHelpMessage } from '../../actions/admin';
import ContactAdmin from './ContactAdmin';
import AboutUsFooter from './AboutUsFooter';


class Footer extends React.Component {

  state = {
    title: '',
    description: '',
    visible: false,
    sent: false
  };

  handleFormSubmit = (event, username, userType) => {
    event.preventDefault();

    const data = {
      username: username,
      userType: userType,
      title: this.state.title,
      description: this.state.description,
      date: new Date()
    };
    addHelpMessage(this, data);
    this.setState({
      visible: true
    });
  };

  render() {
    const { classes, currentUser, userType } = this.props;
    const { visible, sent } = this.state;

    return (
      <div className={classes.footerWrapper}>
        <div className={classes.footerInner}>
          <Grid container spacing={5}>
            {(currentUser) ? (
              <React.Fragment>
                <Grid item xs={12} md={6} lg={1}/>
                <Grid item xs={12} md={6} lg={4}>
                  <ContactAdmin
                    currentUser={currentUser}
                    userType={userType}
                    handleFormSubmit={this.handleFormSubmit}
                    visible={visible}
                    sent={sent}
                    comp={this}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={2}/>
                <Grid item xs={12} md={6} lg={4}>
                  <AboutUsFooter/>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid item xs={12} md={6} lg={4}/>
                <Grid item xs={12} md={6} lg={4}>
                  <AboutUsFooter/>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
