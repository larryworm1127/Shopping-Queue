import React from 'react';
import SearchHistory from './SearchHistory.js';
import QueueHistory from './QueueHistory.js';
import UserProfile from './ShopperProfile.js';
import { getShopper } from '../../../utils/shoppers';
import ProfileBase from '../ProfileBase';
import { withRouter } from 'react-router-dom';


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

  profileSettings = (username, setting) => {
    const shopper = getShopper(username);

    switch (setting) {
      case 0:
        return <UserProfile username={username}/>;
      case 1:
        return <SearchHistory username={username}/>;
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

export default withRouter(ShopperProfile);
