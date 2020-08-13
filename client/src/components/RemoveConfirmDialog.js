import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


class RemoveConfirmDialog extends React.Component {

  render() {
    const { alertOpen, setAlertOpen, removeThunk, removeType } = this.props;

    return (
      <Dialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      >
        <DialogTitle>Remove {removeType}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to remove the {removeType}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              removeThunk();
              setAlertOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default RemoveConfirmDialog;
