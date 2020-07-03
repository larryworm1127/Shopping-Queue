import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import UserProfile from '../Profile/UserProfile';
import SearchHistory from '../Profile/SearchHistory';
import QueueHistory from '../Profile/QueueHistory';


class ShoppersProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileViews : new Array(this.props.admin.viewableShoppers.length).fill(0)
    }
  };

  closeView(index) {
    const stateView = this.state.profileViews[index];
    if (stateView !== 0) {
      return (<Button style={{marginRight: '8px'}} onClick={() => {this.handleViewChange(index, 0)}} variant="contained" color="primary">
                Close
              </Button>);
    }
  };

  handleViewChange(index, newProfileView) {
    let shallowCopyViewsOpen = [...this.state.profileViews];
    let shallowItem = {...shallowCopyViewsOpen[index]};
    shallowItem = newProfileView;
    shallowCopyViewsOpen[index] = shallowItem;
    this.setState({profileViews: shallowCopyViewsOpen});
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

  render() {
    const { admin } = this.props;

    return (
      <React.Fragment>
        {admin.viewableShoppers.map((shopper, index) => (
          <Box m={2}>
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
          </Box>
        ))}
      </React.Fragment>
    );
  }
}

export default ShoppersProfile;