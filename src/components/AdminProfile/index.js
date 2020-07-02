import React from 'react';
import NavBar from '../Nav/navbar';
import AdminPage from './AdminProfile.js';
import ShoppersProfile from './ShoppersProfile.js';
import OwnersProfile from './OwnersProfile.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HistoryIcon from '@material-ui/icons/History';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import { styles } from './style';
import { getAdmin, Admin } from '../../utils/admins';
import store from 'store';
import PropTypes from 'prop-types';


const tabs = [
  'Profile',
  'User Profiles',
  'Shop Owner Profiles'
];

const tabIcons = [
  <PersonIcon/>,
  <HistoryIcon/>,
  <ShoppingCartIcon/>
];

class AdminProfile extends React.Component {
  state = {
    setting: 0,
  };

  setSetting = (val) => {
    this.setState({ setting: val });
  };

  profileSettings = (adminProp) => {
    const admin = (adminProp === undefined) ? getAdmin(store.get('user')) : adminProp;

    switch (this.state.setting) {
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
    const { classes, admin } = this.props;

    return (
      <React.Fragment>
        <CssBaseline/>
        <NavBar currentPath={this.props.location.pathname}/>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}/>
          <Divider/>
          <List>
            {tabs.map((label, index) => (
              <ListItem button key={label} onClick={() => this.setSetting(index)}>
                <ListItemIcon>{tabIcons[index]}</ListItemIcon>
                <ListItemText primary={label}/>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Container className={classes.container}>
          {this.profileSettings(admin)}
        </Container>
      </React.Fragment>
    );
  }
}

AdminProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  shopper: PropTypes.objectOf(Admin)
};

export default withStyles(styles)(AdminProfile);