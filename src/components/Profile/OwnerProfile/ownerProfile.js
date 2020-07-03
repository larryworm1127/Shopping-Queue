import React from "react";
import NavBar from '../../Nav/navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HistoryIcon from '@material-ui/icons/History';
import {getStoreByUsername, Store} from '../../../utils/stores';
import StoreProfile from './StoreProfile';
import StoreSettings from './StoreSettings';
import store from "store";
import PropTypes from 'prop-types';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

const tabs = [
  'Profile',
  'Store Settings'
];

const tabIcons = [
  <PersonIcon/>,
  <HistoryIcon/>,
  <ShoppingCartIcon/>
];

class OwnerPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      setting: 0,
    }
  };

  setSetting = (val) => {
    this.setState({setting: val});
  };

  profileSettings = (storeProp) => {
    const currentStore = (storeProp === undefined) ? getStoreByUsername(store.get('user')) : storeProp;

    switch (this.state.setting) {
      case 0:
        return <StoreProfile store={currentStore}/>;
      case 1:
        return <StoreSettings store={currentStore}/>;
      default:
        return Error('Unknown case');
    }
  };

  render () {
    const { classes, currentStore } = this.props;

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
          {this.profileSettings(currentStore)}
        </Container>
      </React.Fragment>
    );
  }
}

OwnerPage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentStore: PropTypes.objectOf(Store)
};


export default withStyles(styles)(OwnerPage);