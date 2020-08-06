import React from 'react';
import AdminPage from './AdminProfile.js';
import ShoppersProfile from './ShoppersProfile.js';
import OwnersProfile from './OwnersProfile.js';
import { getAdmin } from '../../../utils/admins';
import store from 'store';
import ProfileBase from '../ProfileBase';


const tabs = [
  'Profile',
  'User Profiles',
  'Shop Owner Profiles'
];

class AdminProfile extends React.Component {

  profileSettings = (adminProp, setting) => {
    const admin = (adminProp === undefined) ? getAdmin(store.get('user')) : adminProp;

    switch (setting) {
      case 0:
        return <AdminPage admin={admin}/>;
      case 1:
        return <ShoppersProfile admin={admin}/>;
      case 2:
        return <OwnersProfile admin={admin}/>;
      default:
        return Error('Unknown case');
    }
  };

  render() {
    const { admin, location } = this.props;

    return (
      <ProfileBase
        user={admin}
        tabs={tabs}
        profileSettings={this.profileSettings}
        location={location}
      />
    );
  }
}

export default AdminProfile;