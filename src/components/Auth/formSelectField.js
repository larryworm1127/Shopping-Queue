import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

class FormSelectField extends React.Component {

  render() {
    const {
      name,
      label,
      formControlLabelClass,
      formControlClass,
      value,
      variant,
      handleFormField
    } = this.props

    return (
      <Grid item xs={12}>
        <Typography className={formControlLabelClass}>
          {label}
        </Typography>

        <FormControl
          className={formControlClass}
          variant={variant}
        >
          <Select
            value={value}
            onChange={(event) => {
              handleFormField(name, event);
            }}
            displayEmpty={true}
          >
            <MenuItem value={0}>Shopper</MenuItem>
            <MenuItem value={1}>Store Owner</MenuItem>
            <MenuItem value={2}>Admin</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    );
  }
}
export default FormSelectField;
