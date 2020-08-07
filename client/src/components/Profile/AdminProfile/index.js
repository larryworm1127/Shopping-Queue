import React from 'react';
import AdminPage from './AdminProfile.js';
import ShoppersProfile from './ShoppersProfile.js';
import OwnersProfile from './OwnersProfile.js';
import { getAdmin } from '../../../utils/admins';
import ProfileBase from '../ProfileBase';
import { withRouter } from 'react-router-dom';


const tabs = [
  'Profile',
  'User Profiles',
  'Shop Owner Profiles'
];

class AdminProfile extends React.Component {

  profileSettings = (adminProp, setting, currentUser) => {
    const admin = (adminProp === undefined) ? getAdmin(currentUser) : adminProp;

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
    const { admin } = this.props;

    return (
      <ProfileBase
        {...this.props}
        user={admin}
        tabs={tabs}
        profileSettings={this.profileSettings}
      />
    );
  }
}

export default withRouter(AdminProfile);
