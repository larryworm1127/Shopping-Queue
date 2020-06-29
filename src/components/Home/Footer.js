import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, TextField, Typography, withStyles, withWidth } from '@material-ui/core';
import classNames from 'classnames';
import { styles } from './style';


function Footer(props) {
  const { classes } = props;
  return (
    <div className={classNames('main_div', classes.footerwrapper)}>
      <div className={classes.footerInner}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4}>
            <form>
              <Typography variant="h3" paragraph className={classes.BigFont}>
                Contact Us
              </Typography>
              <Box display="flex" flexDirection="column">
                <Box mb={1}>
                  <TextField
                    variant="outlined"
                    multiline
                    placeholder="Contact us"
                    rows={4}
                    InputProps={{ className: classes.inputField }}
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

          <Grid item xs={12} md={6} lg={4}>
            <Box display="flex" justifyContent="center">

            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h3" paragraph className={classes.BigFont}>
              About Us
            </Typography>
            <Typography className={classes.paragraph} paragraph>

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
