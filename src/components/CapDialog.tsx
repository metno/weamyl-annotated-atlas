import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
} from '@mui/material';
import Draggable from 'react-draggable';
import databaseFunctions from '../utils/databaseFunctions';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

type Props = {
  openDialog: boolean;
  setOpenDialog: any;
  warningAttachment: string;
};

const CapDialog: React.FC<Props> = (props) => {
  const { openDialog, setOpenDialog, warningAttachment } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        PaperProps={{ sx: { width: '75%', height: '100%' } }}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Cap-file
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <pre>
              <code
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
              >
                {warningAttachment}
              </code>
            </pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CapDialog;
