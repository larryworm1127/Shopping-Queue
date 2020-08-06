import React from 'react';
import SearchHistory from './SearchHistory.js';
import QueueHistory from './QueueHistory.js';
import UserProfile from './ShopperProfile.js';
import { getShopper } from '../../../utils/shoppers';
import store from 'store';
import ProfileBase from '../ProfileBase';


const tabs = [
  'Profile',
  'Search History',
  'Queue History'
];

class ShopperProfile extends React.Component {

  profileSettings = (propShopper, setting) => {
    const shopper = (propShopper === undefined) ? getShopper(store.get('user')) : propShopper;

    switch (setting) {
      case 0:
        return <UserProfile shopper={shopper}/>;
      case 1:
        return <SearchHistory shopper={shopper}/>;
      case 2:
        return <QueueHistory shopper={shopper}/>;
      default:
        return Error('Unknown case');
    }
  };

  render() {
    const { location, shopper } = this.props;

    return (
      <ProfileBase
        user={shopper}
        tabs={tabs}
        profileSettings={this.profileSettings}
        location={location}
      />
    );
  }
}

export default ShopperProfile;
