export const UserType = {
  shopper: 0,
  store: 1,
  admin: 2
};


export const getUserTypeText = (userType) => {
  switch (userType) {
    case 0:
      return 'Shopper';
    case 1:
      return 'Store';
    default:
      return 'Admin';
  }
};


export const getEmptyRows = (data, page, rowsPerPage) => {
  return (data) ? rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage) : 0;
};


export const handleFormField = function (field, event) {
  if (this.state.displayError !== undefined) {
    this.setState({
      [field]: event.target.value,
      displayError: false,
      errorMessage: ''
    });
  } else {
    this.setState({
      [field]: event.target.value,
    });
  }
};
