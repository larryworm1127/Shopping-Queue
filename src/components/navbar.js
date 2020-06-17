import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "../utils/Menu";

// Temp React logo
const logo = require("../logo.svg");

// Material UI themed style
const styles = theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "white"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagLine: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  }
});

// NavBar component class
class NavBar extends Component {
  state = {
    tabIndex: 0,
  };

  handleTabChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar
        position="absolute"
        color="default"
        className={classes.appBar}
      >
        <Toolbar>
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <img width={20} src={logo} alt="React logo"/>
                <span className={classes.tagLine}>Shopping Queue</span>
              </Typography>
            </div>

            <div className={classes.productLogo}>
              <Typography>A Pandemic Shopping Manager</Typography>
            </div>

            <div className={classes.tabContainer}>
              <Tabs
                value={this.state.tabIndex}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleTabChange}
              >
                {Menu.map((item, index) => (
                  <Tab
                    key={index}
                    classes={{ root: classes.tabItem }}
                    label={item.label}
                  />
                ))}
              </Tabs>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);
