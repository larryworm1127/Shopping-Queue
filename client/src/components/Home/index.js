import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import Footer from './Footer';
import { getServiceDataShopper, getServiceDataStore, getServiceDataDefault, getServiceDataAdmin } from '../../utils/services';
import Services from './Services';
import { CssBaseline } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { getShopperFavoriteStores, getShopperQueueHistory } from '../../actions/shopper'
import { getCurrentQueues } from '../../actions/queue'
import { getHelpMessages, getAllShoppers, getAllStores } from '../../actions/admin'
import { getAllQueuesforStore, getTodayQueuesforStore } from '../../actions/store'

/* Component for the Home page */
class Home extends React.Component {

  state = {
    favoriteStores: [],
    queueHistory: [],
    queues: [],
    numOfQueues: 0,
    numCustomers: 0,
    shopTime: 0,
    messages: [],
    shoppers: [],
    stores: [],
    TotalShoppers: 0,
    TotalShoppersToday: 0,
    NumberofShoppersinStore: 0,
    NumberofShoppersinQueue: 0,
    AverageWaitTime: 0
  }

  constructor(props) {
    super(props);
    this.props.history.push('/')
  }

  componentWillMount() {
    if (this.props.userType === 0) {
      getShopperFavoriteStores(this.props.currentUser, this)
      getShopperQueueHistory(this.props.currentUser, this)
    }
    else if (this.props.userType === 1) {
      getAllQueuesforStore(this.props.currentUser, this);
      getTodayQueuesforStore(this.props.currentUser, this);
    }
    else if (this.props.userType === 2) {
      getHelpMessages(this)
      getAllShoppers(this)
      getAllStores(this)
    }
  }

  componentDidUpdate() {
    if (this.props.userType === 0) {
      getShopperFavoriteStores(this.props.currentUser, this)
      getShopperQueueHistory(this.props.currentUser, this)
    }
    else if (this.props.userType === 1) {
      getAllQueuesforStore(this.props.currentUser, this);
      getTodayQueuesforStore(this.props.currentUser, this);
    }
    else if (this.props.userType === 2) {
      getHelpMessages(this)
      getAllShoppers(this)
      getAllStores(this)
    }
  }

  render() {
    const { userType, currentUser, isLoggedIn } = this.props;

    const serviceData = userType === 0 ? getServiceDataShopper(this.state.favoriteStores, this.state.queueHistory) :
      userType === 1 ? getServiceDataStore(this.state.NumberofShoppersinQueue, this.state.TotalShoppersToday, this.state.AverageWaitTime) :
        userType === 2 ? getServiceDataAdmin(this.state.messages.length, this.state.shoppers.length, this.state.stores.length) : getServiceDataDefault()

    return (
      <React.Fragment>
        <NavBar userType={userType} isLoggedIn={isLoggedIn} />
        <CssBaseline />
        <HeadSection userType={userType} currentUser={currentUser} />
        <Services serviceData={serviceData} />

        {userType !== 2 && <Footer currentUser={currentUser} userType={userType} />}
      </React.Fragment>
    );
  }
}


export default withRouter(Home);
