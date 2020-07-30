export const styles = theme => ({
  header: {
    marginTop: '40px',
    marginBottom: '40px',
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'red'
  },
  bookingList: {
    marginTop: theme.spacing(4)
  },
  booking: {
    marginBottom: '5px',
    fontSize: '150%',
    '& th': {
      fontSize: '0.75em',
      color: 'darkslategray'
    }
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  tableCellCollapse: {
    paddingBottom: 0,
    paddingTop: 0
  },
});
