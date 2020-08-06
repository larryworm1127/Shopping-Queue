import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import Footer from './Footer';
import { getServiceData } from '../../utils/services';
import store from 'store';
import Services from './Services';
import { CssBaseline } from '@material-ui/core';


/* Component for the Home page */
class Home extends React.Component {
  render() {
    const { location } = this.props;
    const serviceData = getServiceData((store.get('loggedIn')) ? store.get('loginAs') : -1, store.get('user'));

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname}/>
        <CssBaseline/>
        <HeadSection/>
        <Services serviceData={serviceData}/>

        {store.get('loggedIn') && (store.get('loginAs') !== 2) &&
        <Footer/>
        }
      </React.Fragment>
    );
  }
}

export default Home;
