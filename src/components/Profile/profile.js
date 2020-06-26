import React from 'react';
import NavBar from '../Nav/navbar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchHistory from './searchHistory.js';
import QueueHistory from './queueHistory.js';
import UserProfile from './userProfile.js';


const tabs = ['Profile', 'Search History', 'Queue History'];

class Profile extends React.Component {

  state = {
    setting: 0,
  };

  setSetting = (val) => {
    this.setState({ setting: val });
  };

  profileSettings = () => {
    switch (this.state.setting) {
      case 0:
        return <UserProfile/>;
      case 1:
        return <SearchHistory/>;
      case 2:
        return <QueueHistory/>;
      default:
        return Error('Unknown case');
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar currentPath={this.props.location.pathname}/>
        <Grid container direction="row" justify="center" alignItems="baseline" spacing={3}>
          <Grid item xs={2}>
            <Card>
              <CardContent>
                <Grid container direction="column" alignItems="flex-start" alignContent="flex-start">
                  {tabs.map((label) => (
                    <Grid item key={label}>
                      <Button onClick={() => this.setSetting(tabs.indexOf(label))}>
                        <Link>
                          {label}
                        </Link>
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            {this.profileSettings()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default (Profile);
