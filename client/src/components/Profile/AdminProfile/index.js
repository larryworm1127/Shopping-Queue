import React from 'react';
import AdminPage from './AdminProfile.js';
import ShoppersProfile from './ShoppersProfile.js';
import StoresProfile from './StoresProfile.js';
import ProfileBase from '../ProfileBase';
import { withRouter } from 'react-router-dom';


const tabs = [
  'Profile',
  'User Profiles',
  'Shop Owner Profiles'
];

class AdminProfile extends React.Component {

  profileSettings = (username, setting) => {
    switch (setting) {
      case 0:
        return <AdminPage username={username}/>;
      case 1:
        return <ShoppersProfile/>;
      case 2:
        return <StoresProfile/>;
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

export default withRouter(AdminProfile);
