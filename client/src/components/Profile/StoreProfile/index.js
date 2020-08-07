import React from 'react';
import { getStoreByUsername } from '../../../utils/stores';
import UserProfile from './StoreProfile';
import StoreSettings from './StoreSettings';
import ProfileBase from '../ProfileBase';
import { withRouter } from 'react-router-dom';


const tabs = [
  'Profile',
  'Store Settings'
];


class StoreProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props.history.push('/store/profile');
  }

  profileSettings = (storeProp, setting, currentUser) => {
    const currentStore = (storeProp === undefined) ? getStoreByUsername(currentUser) : storeProp;

    switch (setting) {
      case 0:
        return <UserProfile store={currentStore}/>;
      case 1:
        return <StoreSettings store={currentStore}/>;
      default:
        return Error('Unknown case');
    }
  };

  render() {
    const { currentStore } = this.props;

    return (
      <ProfileBase
        {...this.props}
        user={currentStore}
        tabs={tabs}
        profileSettings={this.profileSettings}
      />
    );
  }
}

export default withRouter(StoreProfile);
