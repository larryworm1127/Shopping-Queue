import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import Footer from './Footer';
import { getServiceData } from '../../utils/services';
import store from 'store';
import Services from './Services';
import { styles } from './style';
import { CssBaseline, withStyles } from '@material-ui/core';


/* Component for the Home page */
class Home extends React.Component {
  render() {
    const { location, classes } = this.props;
    const serviceData = getServiceData((store.get('loggedIn')) ? store.get('loginAs') : -1, store.get('user'));

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>
        <HeadSection classes={classes}/>
        <Services classes={classes} serviceData={serviceData}/>

        {store.get('loggedIn') && (store.get('loginAs') !== 2) &&
        <Footer classes={classes}/>
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
