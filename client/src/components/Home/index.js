import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import Footer from './Footer';
import { getServiceData } from '../../utils/services';
import Services from './Services';
import { CssBaseline } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { getShopperFavoriteStores } from '../../actions/shopper'


/* Component for the Home page */
class Home extends React.Component {

  state = {
    favoriteStores: [],
    queueHistory: []
  }

  componentDidMount() {
    getShopperFavoriteStores(this.props.currentUser, this)
  }

  constructor(props) {
    super(props);
    this.props.history.push('/')
  }

  render() {
    const { userType, currentUser, isLoggedIn } = this.props;
    const serviceData = getServiceData((isLoggedIn) ? userType : -1, currentUser, this.state.favoriteStores);

    return (
      <React.Fragment>
        <NavBar userType={userType} isLoggedIn={isLoggedIn}/>
        <CssBaseline/>
        <HeadSection userType={userType} currentUser={currentUser}/>
        <Services serviceData={serviceData}/>

        {userType !== 2 && <Footer currentUser={currentUser} userType={userType}/>}
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
