import {
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useAuth } from 'react-oidc-context';
import { apiConfig } from '../utils/apiConfig';

export default function DemoMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const auth = useAuth();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCsvDownload = () => {
    handleClose();
    window.location.assign(apiConfig.evaluationExportUrl);
  };

  const handleLoginOut = (event: React.MouseEvent<HTMLElement>) => {
    handleClose();
    if (auth) {
      if (auth.isAuthenticated) {
        auth.removeUser();
      } else {
        auth.signinRedirect();
      }
    }
  };

  return (
    <Box component="div" sx={{ display: 'flex' }}>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MenuIcon sx={{ color: 'primary.contrastText' }} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'right top' : 'right bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={handleCsvDownload}>Download CSV</MenuItem>
                  <MenuItem onClick={handleLoginOut}>
                    {auth.isAuthenticated ? 'Logout' : 'Login'}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
