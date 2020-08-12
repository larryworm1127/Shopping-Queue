import React from 'react';
import UserProfile from './StoreProfile';
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

  profileSettings = (username) => {
    return <UserProfile username={username}/>;
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
