import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../Nav/navbar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import PersonIcon from '@material-ui/icons/Person';
import HistoryIcon from '@material-ui/icons/History';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { styles } from './style';
import { withStyles } from '@material-ui/core';
import { uid } from 'react-uid';


const tabIcons = [
  <PersonIcon/>,
  <ShoppingCartIcon/>,
  <HistoryIcon/>,
  <ShoppingCartIcon/>
];

class ProfileBase extends React.Component {

  state = {
    setting: 0,
  };

  setSetting = (val) => {
    this.setState({ setting: val });
  };

  render() {
    const { classes, username, tabs, profileSettings, currentUser, userType, isLoggedIn } = this.props;
    const { setting } = this.state;

    return (
      <React.Fragment>
        <CssBaseline/>
        <NavBar userType={userType} isLoggedIn={isLoggedIn}/>

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
              <ListItem button key={uid(label)} onClick={() => this.setSetting(index)}>
                <ListItemIcon>{tabIcons[index]}</ListItemIcon>
                <ListItemText primary={label}/>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Container className={classes.container}>
          {profileSettings((username) ? username : currentUser, setting)}
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ProfileBase);
