import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';


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
      <Dialog
        fullWidth={true}
        PaperProps={{ sx: { width: '75%', height: '100%' } }}
        open={openDialog}
        onClose={handleClose}
        maxWidth={'lg'}
      >
        <DialogTitle style={{ cursor: 'move' ,fontWeight: 'bold' ,}}  >
          Cap-file
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              <code
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}
              >
                {warningAttachment}
              </code>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default CapDialog;
