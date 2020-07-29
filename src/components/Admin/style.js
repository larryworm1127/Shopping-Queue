export const styles = theme => ({
  titleText: {
    marginTop: theme.spacing(5)
  },
  storesTable: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
  }
});
