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
};

const CapDialog: React.FC<Props> = (props) => {
  const { openDialog, setOpenDialog } = props;

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae
            est et augue dignissim pulvinar. Sed suscipit est vel faucibus
            lacinia. Mauris in tempor quam. Maecenas finibus odio sed justo
            elementum auctor. Nullam vel facilisis felis. Nulla blandit nunc
            magna, ut scelerisque magna egestas vitae. Morbi sodales, est sit
            amet lobortis tincidunt, nisl velit mollis ligula, sit amet tempor
            nisi nisi vitae quam. In non erat nec dui condimentum mollis. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nullam libero purus, elementum a pharetra quis,
            fermentum et erat. Vivamus dignissim vestibulum neque scelerisque
            facilisis. Fusce accumsan fermentum sem, sed tempor arcu vulputate
            at. Duis sit amet risus lorem. Maecenas diam tortor, ultrices
            rhoncus laoreet posuere, consectetur vel leo. Etiam nec condimentum
            elit. Donec volutpat metus magna, ut scelerisque nunc blandit quis.
            Nulla luctus nibh neque. In dictum nibh sit amet libero
            pellentesque, vel vulputate nulla pellentesque. Aenean porttitor,
            lacus et malesuada pretium, turpis lacus congue ipsum, non porttitor
            arcu sapien in massa. Donec in consectetur orci. Pellentesque ut
            nibh vestibulum, placerat ligula vel, cursus erat. Suspendisse ac
            mattis sapien, sed sodales urna. Pellentesque in libero gravida,
            iaculis nisi in, auctor urna. Nunc faucibus felis purus, sed finibus
            nisi sagittis et. Vestibulum vitae velit et metus mollis malesuada.
            Donec dolor nibh, iaculis nec diam eu, luctus ornare tellus. Aenean
            sollicitudin enim vitae leo rhoncus, efficitur faucibus turpis
            vehicula. Proin quis gravida massa. Vivamus auctor tortor bibendum,
            ullamcorper lorem eget, luctus erat. Ut non magna ultrices mauris
            lacinia vulputate. Aenean at dolor faucibus, finibus risus quis,
            aliquet turpis. Nunc vel varius metus. Fusce pretium pharetra justo,
            ac finibus massa. Duis a mauris quis urna pretium malesuada. Duis
            auctor aliquam commodo. Curabitur a arcu facilisis, ornare orci
            laoreet, condimentum ipsum. Nam nec consequat ipsum. Phasellus
            finibus a arcu id placerat. Suspendisse rhoncus luctus turpis, in
            pretium mi convallis at. Proin imperdiet lobortis est, ac
            scelerisque turpis iaculis eget. Maecenas et diam venenatis,
            convallis magna eu, faucibus elit. Donec vel enim tempus, efficitur
            ipsum non, hendrerit ipsum. Ut eleifend ut augue non tempor. Fusce
            et aliquet metus. Nam sollicitudin ligula eu ante bibendum, non
            venenatis enim porttitor. Mauris sed ligula eget nulla volutpat
            ultrices id in diam. Nam a sapien faucibus, imperdiet ex eu,
            malesuada urna. Fusce egestas et leo eget gravida. Donec pretium
            vitae lacus quis dignissim. Vivamus dignissim vitae libero ac
            blandit. Vestibulum pulvinar elit interdum euismod placerat. Donec
            varius mollis magna a tincidunt. Aenean consectetur massa et
            fringilla mollis.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CapDialog;
