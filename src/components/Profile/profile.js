import React from "react";
import NavBar from "../navbar";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import History from "./history.js"
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
        return <History text="K"></History>;
      case 1:
        return <History text="L"></History>;
      case 2:
        return <History text="M"></History>;
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
                        Account History
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => this.setSetting(2)}>
                      <Link>
                        Privacy Settings
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
