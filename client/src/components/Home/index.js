import React from 'react';
import NavBar from '../Nav/navbar';
import HeadSection from './HeadSection';
import Footer from './Footer';
import {
  getServiceDataAdmin,
  getServiceDataDefault,
  getServiceDataShopper,
  getServiceDataStore
} from '../../utils/services';
import Services from './Services';
import { CssBaseline } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { getShopperFavoriteStores, getShopperQueueHistory } from '../../actions/shopper';
import { getCurrentQueues } from '../../actions/queue';
import { getAllShoppers, getAllStores, getHelpMessages } from '../../actions/admin';
import { UserType } from '../../utils/utils';


/* Component for the Home page */
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/')
  }

  componentDidMount() {
    const { userType, currentUser } = this.props
    const { queues } = this.state;

    switch (userType) {
      case UserType.shopper:
        getShopperFavoriteStores(currentUser, this);
        getShopperQueueHistory(currentUser, this);
        break;
      case UserType.store:
        getCurrentQueues(currentUser, this, 'store');

        if (queues[0] !== undefined) {
          const total1 = queues.reduce((a, b) => {
            return { numCustomers: a.numCustomers + b.numCustomers };
          });
          const total2 = queues.reduce((a, b) => {
            return { shopTime: a.shopTime + b.shopTime };
          });

          this.setState({
            numOfQueues: queues.length,
            numCustomers: total1.numCustomers,
            shopTime: total2.shopTime / queues.length
          });
        }
        break;
      case UserType.admin:
        getHelpMessages(this);
        getAllShoppers(this);
        getAllStores(this);
        break;
      default:
        return;
    }
  }

  state = {
    favoriteStores: [],
    queueHistory: [],
    queues: [],
    numOfQueues: 0,
    numCustomers: 0,
    shopTime: 0,
    messages: [],
    shoppers: [],
    stores: []
  };

  getServiceData = (userType) => {
    const { favoriteStores, queueHistory, numOfQueues, numCustomers, shopTime, messages, shoppers, stores } = this.state;

    switch (userType) {
      case 0:
        return getServiceDataShopper(favoriteStores, queueHistory);
      case 1:
        return getServiceDataStore(numOfQueues, numCustomers, shopTime);
      case 2:
        return getServiceDataAdmin(messages.length, shoppers.length, stores.length);
      default:
        return getServiceDataDefault();
    }
  };

  render() {
    const { userType, currentUser, isLoggedIn } = this.props;

    const serviceData = this.getServiceData(userType);
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
