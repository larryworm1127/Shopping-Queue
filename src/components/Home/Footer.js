import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Hidden,
  withStyles,
  withWidth,
  isWidthUp,
  TextField
} from "@material-ui/core";
import classNames from "classnames";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

// import ColoredButton from "../../../shared/components/ColoredButton";
import { styles } from './style';


const infos = [
  {
    icon: <PhoneIcon />,
    description: "+000 000 0000"
  },
  {
    icon: <MailIcon />,
    description: "support@company.com"
  }
];

function Footer(props) {
  const { classes, width } = props;
  return (
    <div className={classNames("main_div", classes.wrapper)}>
      <div className={classes.footerInner}>
        <Grid container spacing={isWidthUp("md", width) ? 10 : 5}>
          <Grid item xs={12} md={6} lg={4}>
            <form>
              <Box display="flex" flexDirection="column">
                <Box mb={1}>
                  <TextField
                    variant="outlined"
                    multiline
                    placeholder="Contact us"
                    rows={4}
                    InputProps={{ className: classes.whiteBg }}
                    fullWidth
                    required
                  />
                </Box>
                <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          className={classes.Button}
                          classes={{ label: classes.ButtonLabel }}
                          
                        >
                          Submit
                        </Button>
              </Box>
            </form>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6} lg={4}>
              <Box display="flex" justifyContent="center">
                <div>
                  {infos.map((info, index) => (
                    <Box display="flex" mb={1} key={index}>
                      <Box mr={2}>
                        <IconButton
                          className={classes.infoIcon}
                          tabIndex={-1}
                          disabled
                        >
                          {info.icon}
                        </IconButton>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                      >
                        <Typography variant="h6" className="text-white">
                          {info.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </div>
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" paragraph className="text-white">
              About the Company
            </Typography>
            <Typography style={{ color: "#8f9296" }} paragraph>
              Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
              euismod convallis velit, eu auctor lacus vehicula sit amet.
            </Typography>
            
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, { withTheme: true })(Footer));
