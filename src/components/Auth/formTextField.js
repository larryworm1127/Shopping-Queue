import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class FormTextField extends React.Component {

  render() {
    const {
      name,
      label,
      type,
      displayError,
      handleFormField,
      errorMessage,
      margin,
      variant,
      defaultValue
    } = this.props;

    return (
      <Grid item xs={12}>
        <TextField
          margin={margin}
          variant={variant}
          required
          fullWidth
          id={name}
          name={name}
          label={label}
          type={type}
          error={displayError}
          helperText={errorMessage}
          defaultValue={defaultValue}
          onChange={(event) => {
            handleFormField(name, event);
          }}
        />
      </Grid>
    );
  }
}

export default FormTextField;
