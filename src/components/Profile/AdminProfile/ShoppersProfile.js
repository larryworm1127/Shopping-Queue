import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserProfile from '../ShopperProfile/ShopperProfile';
import SearchHistory from '../ShopperProfile/SearchHistory';
import QueueHistory from '../ShopperProfile/QueueHistory';
import Grid from '@material-ui/core/Grid';
import ProfileDataDisplay from '../ProfileDataDisplay';
import { styles } from '../style';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class ShoppersProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileViews: new Array(this.props.admin.viewableShoppers.length).fill(0)
    };
  };

  closeView(index) {
    const stateView = this.state.profileViews[index];
    if (stateView !== 0) {
      return (<Button style={{ marginRight: '8px' }} onClick={() => {
        this.handleViewChange(index, 0);
      }} variant="contained" color="primary">
        Close
      </Button>);
    }
  };

  handleViewChange(index, newProfileView) {
    let shallowCopyViewsOpen = [...this.state.profileViews];
    let shallowItem = { ...shallowCopyViewsOpen[index] };
    shallowItem = newProfileView;
    shallowCopyViewsOpen[index] = shallowItem;
    this.setState({ profileViews: shallowCopyViewsOpen });
  };

  getView(index) {
    const shopper = this.props.admin.viewableShoppers[index];
    const stateView = this.state.profileViews[index];
    switch (stateView) {
      case 1:
        return <UserProfile shopper={shopper}/>;
      case 2:
        return <SearchHistory shopper={shopper}/>;
      case 3:
        return <QueueHistory shopper={shopper}/>;
      default:
        return;
    }
  };

  renderShopperProfileContent = (shopper, index, classes) => (
    <React.Fragment>
      <Typography component="p" variant="h6">Email: {shopper.email}</Typography>
      <Typography component="p" variant="h6">Location: {shopper.address}</Typography>

      <Button
        className={classes.adminShopperProfileButton}
        onClick={() => {
          this.handleViewChange(index, 1);
        }}
        size="small"
        variant="contained"
        color="primary"
      >
        View Profile
      </Button>
      <Button
        className={classes.adminShopperProfileButton}
        onClick={() => {
          this.handleViewChange(index, 2);
        }}
        variant="contained"
        color="primary"
      >
        View Search History
      </Button>
      <Button
        className={classes.adminShopperProfileButton}
        onClick={() => {
          this.handleViewChange(index, 3);
        }}
        variant="contained"
        color="primary"
      >
        View Queue History
      </Button>
      {this.closeView(index)}
      {this.getView(index)}
    </React.Fragment>
  );

  render() {
    const { admin, classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          {admin.viewableShoppers.map((shopper, index) => (
            // <ProfileDataDisplay
            //   gridSize={12}
            //   key={index}
            //   title={`${shopper.firstName} ${shopper.lastName}`}
            //   contentComponent={this.renderShopperProfileContent(shopper, index, classes)}
            // />
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Typography
                  component="h2"
                  variant="h5"
                  color="primary"
                  gutterBottom
                  >
                    {shopper.firstName} {shopper.lastName}
                  </Typography>
                  <Typography variant='body1'>Email: {shopper.email}</Typography>
                  <Typography variant='body1'>Location: {shopper.address}</Typography>
                  <Button style={{marginRight: '8px'}} onClick={() => {this.handleViewChange(index, 1)}} variant="contained" color="primary">
                    View Profile
                  </Button>
                  <Button style={{marginRight: '8px'}} onClick={() => {this.handleViewChange(index, 2)}} variant="contained" color="primary">
                    View Search History
                  </Button>
                  <Button style={{marginRight: '8px'}} onClick={() => {this.handleViewChange(index, 3)}} variant="contained" color="primary">
                    View Queue History
                  </Button>
                  {this.closeView(index)}
                  {this.getView(index)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ShoppersProfile);