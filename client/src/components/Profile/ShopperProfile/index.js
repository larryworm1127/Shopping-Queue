import React from 'react';
import SearchHistory from './SearchHistory.js';
import QueueHistory from './QueueHistory.js';
import UserProfile from './ShopperProfile.js';
import { getShopper } from '../../../utils/shoppers';
import ProfileBase from '../ProfileBase';


const tabs = [
  'Profile',
  'Search History',
  'Queue History'
];

class ShopperProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/profile');
  }

  profileSettings = (propShopper, setting, currentUser) => {
    const shopper = (propShopper === undefined) ? getShopper(currentUser) : propShopper;

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

    return (
      <ProfileBase
        {...this.props}
        tabs={tabs}
        profileSettings={this.profileSettings}
      />
    );
  }
}

export default ShopperProfile;
