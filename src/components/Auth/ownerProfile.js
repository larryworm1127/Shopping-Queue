import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';


class OwnerProfile extends React.Component {

  state = {
    value: 0
  };

  handleBlur = () => {
    if (this.state.value < 0) {
      this.setState({ value: 0 });
    } else if (this.state.value > 100) {
      this.setState({ value: 100 });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Profile details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="storeName"
              name="storeName"
              label="Store Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="location"
              name="location"
              label="Location"
              fullWidth
              autoComplete="address"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="customerLimit"
              name="customerLimit"
              label="Customer Limit"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="start-time"
              label="Opening Time"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="start-time"
              label="Closing Time"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Customer Shopping Time Limit (min)</Typography>
            <Slider
              value={typeof this.state.value === 'number' ? this.state.value : 0}
              onChange={
                (event, newValue) => {
                  this.setState({ value: newValue });
                }
              }
            />
            <Input
              value={this.state.value}
              margin="dense"
              onChange={
                (event) => {
                  this.setState({ value: event.target.value === '' ? '' : Number(event.target.value) });
                }
              }
              onBlur={this.handleBlur}
              inputProps={{
                step: 10,
                min: 0,
                max: 60,
                type: 'number',
              }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default OwnerProfile;
