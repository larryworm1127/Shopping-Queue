import React from "react";
import NavBar from "../navbar";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchHistory from "./searchHistory.js"
import QueueHistory from "./queueHistory.js"

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      setting: 0,
    }
  }

  setSetting = (val) => {
    this.setState({setting: val});
  }

  profileSettings = () => {
    switch(this.state.setting) {
      case 0:
        return <SearchHistory></SearchHistory>;
      case 1:
        return <SearchHistory></SearchHistory>;
      case 2:
        return <QueueHistory></QueueHistory>;
    };
  }

  render() {
    return (
      <React.Fragment>
        <NavBar currentPath={this.props.location.pathname}/>
        <Grid container direction="row" justify="center" alignItems="baseline" spacing={3}>
          <Grid item xs={2}>
            <Card>
              <CardContent>
                <Grid container direction="column" alignItems="flex-start" alignContent="flex-start">
                  <Grid item>
                      <Button onClick={() => this.setSetting(0)}>
                        <Link>
                          Profile
                        </Link>
                      </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => this.setSetting(1)}>
                      <Link>
                        Search History
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => this.setSetting(2)}>
                      <Link>
                        Queue History
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent> 
            </Card>
          </Grid>
          <Grid item xs={8}> 
            {this.profileSettings()}
          </Grid>
        </Grid>
      </React.Fragment> 
    )
  }
}

export default (Profile);
