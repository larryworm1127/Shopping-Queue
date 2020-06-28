import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles, withWidth } from "@material-ui/core";

import BuildIcon from "@material-ui/icons/Build";
import ComputerIcon from "@material-ui/icons/Computer";
import BarChartIcon from "@material-ui/icons/BarChart";
import HeadsetMicIcon from "@material-ui/icons/HeadsetMic";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MeassageIcon from "@material-ui/icons/Message";
import Iconcard from "./IconCard";
import classNames from "classnames";
import { styles } from './style';

const iconSize = 30;

const services = [
  {
    color: "#00C853",
    headline: "Service 1",
    text:
      "Our service",
    icon: <BuildIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0"
  },
  {
    color: "#6200EA",
    headline: "Service 2",
    text:
      "Our service",
    icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200"
  },
  {
    color: "#0091EA",
    headline: "Service 3",
    text:
      "Our service",
    icon: <MeassageIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0"
  },
  {
    color: "#d50000",
    headline: "Service 4",
    text:
      "Our service",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200"
  },
  {
    color: "#DD2C00",
    headline: "Service 5",
    text:
      "Our service",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0"
  },
  {
    color: "#64DD17",
    headline: "Service 6",
    text:
      "Our service",
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200"
  },

];

function ServiceSect(props) {
  const { classes, width } = props;
  return (
    <div className="container-fluid main_div">
      <div className={classNames(classes.containerFix, "container")}>
        <Typography variant="h3" align="center">
          Services
        </Typography>
      </div>
      <div className={classNames(classes.container)}>
        <Grid container spacing="5">
          {services.map(element => (
            <Grid
              item
              xs={6}
              md={4}
              key={element.headline}
            >
              <Iconcard
                Icon={element.icon}
                color={element.color}
                headline={element.headline}
                text={element.text}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>

  );
}

ServiceSect.propTypes = {
  width: PropTypes.string.isRequired
};



export default withWidth()(
  withStyles(styles)(ServiceSect));
