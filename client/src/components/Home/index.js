import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import Footer from './Footer';
import { getServiceData } from '../../utils/services';
import Services from './Services';
import { CssBaseline } from '@material-ui/core';
import { withRouter } from 'react-router-dom';


/* Component for the Home page */
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/')
  }

  render() {
    const { location, userType, currentUser } = this.props;
    const serviceData = getServiceData((userType !== null) ? userType : -1, currentUser);

    return (
      <React.Fragment>
        <NavBar currentPath={location.pathname} userType={userType}/>
        <CssBaseline/>
        <HeadSection userType={userType} currentUser={currentUser}/>
        <Services serviceData={serviceData}/>

        {userType !== 2 && <Footer/>}
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
