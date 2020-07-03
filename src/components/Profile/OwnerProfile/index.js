import React from 'react';
import { getStoreByUsername } from '../../../utils/stores';
import StoreProfile from './StoreProfile';
import StoreSettings from './StoreSettings';
import store from 'store';
import ProfileBase from '../ProfileBase';


const tabs = [
  'Profile',
  'Store Settings'
];

class OwnerPage extends React.Component {

  profileSettings = (storeProp, setting) => {
    const currentStore = (storeProp === undefined) ? getStoreByUsername(store.get('user')) : storeProp;

    switch (setting) {
      case 0:
        return <StoreProfile store={currentStore}/>;
      case 1:
        return <StoreSettings store={currentStore}/>;
      default:
        return Error('Unknown case');
    }
  };

  render() {
    const { currentStore, location } = this.props;

    return (
      <ProfileBase
        user={currentStore}
        tabs={tabs}
        profileSettings={this.profileSettings}
        location={location}
      />
    );
  }
}

export default OwnerPage;
