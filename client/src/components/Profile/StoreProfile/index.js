import React from 'react';
import { getStoreByUsername } from '../../../utils/stores';
import UserProfile from './StoreProfile';
import StoreSettings from './StoreSettings';
import ProfileBase from '../ProfileBase';
import { withRouter } from 'react-router-dom';


const tabs = [
  'Profile',
];


class StoreProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/store/profile');
  }

  profileSettings = (username, setting, currentUser) => {
    return <UserProfile username={(username) ? username : currentUser}/>;
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

export default withRouter(StoreProfile);
