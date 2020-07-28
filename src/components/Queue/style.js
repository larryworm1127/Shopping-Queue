export const styles = theme => ({
  header: {
    marginTop: '40px',
    marginBottom: '40px',
    textAlign: 'center'
  },
  details: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  },
  detailsInner: {
    position: 'absolute',
    left: '35%',
    right: '35%',
    top: '35%',
    bottom: '27%',
    margin: 'auto',
    borderRadius: '20px',
    background: 'white'
  },
  button2: {
    padding: '5px 15px',
    outline: 'none',
    backgroundColor: '#003d99',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '20px 0 0 250px',
  },
  button: {
    padding: '5px 15px',
    outline: 'none',
    backgroundColor: '#003d99',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '0 0 0 20px',
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
});
