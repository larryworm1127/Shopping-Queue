import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StoreSettings from '../OwnerProfile/StoreSettings';
import StoreProfile from '../OwnerProfile/StoreProfile';

class OwnersProfile extends React.Component {

  state = {
    profileViews: new Array(this.props.admin.viewableStores.length).fill(0)
  };

  closeView(index) {
    const stateView = this.state.profileViews[index];
    if (stateView !== 0) {
      return (
        <Button
          style={{ marginRight: '8px' }}
          onClick={() => {
            this.handleViewChange(index, 0);
          }}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      );
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
    const store = this.props.admin.viewableStores[index];
    const stateView = this.state.profileViews[index];
    switch (stateView) {
      case 1:
        return <StoreProfile store={store}/>;
      case 2:
        return <StoreSettings store={store}/>;
      default:
        return;
    }
  };

  render() {
    const { admin } = this.props;

    return (
      <React.Fragment>
        {admin.viewableStores.map((store, index) => (
          <Box m={2}>
            <Card>
              <CardContent>
                <Typography
                  component="h2"
                  variant="h5"
                  color="primary"
                  gutterBottom
                >
                  {store.name}
                </Typography>
                <Typography variant='body1'>Email: {store.email}</Typography>
                <Typography variant='body1'>Location: {store.address}</Typography>
                <Button
                  style={{ marginRight: '8px' }}
                  onClick={() => {
                    this.handleViewChange(index, 1);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Store Profile
                </Button>
                <Button
                  style={{ marginRight: '8px' }}
                  onClick={() => {
                    this.handleViewChange(index, 2);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Store Settings
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

export default OwnersProfile;