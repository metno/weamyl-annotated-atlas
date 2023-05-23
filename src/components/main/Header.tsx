import React from 'react';
import Menu from '../Menu';
import SearchIcon from '@mui/icons-material/Search';
import { pageSpacing } from '../../utils/metMuiThemes';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import metLogo from '../../images/met_logo.png';
import UserInfo from '../UserInfo';

const Header: React.FC = () => {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        paddingBottom: 1,
        marginBottom: 1,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <AppBar position={'static'}>
        <Toolbar sx={(theme) => pageSpacing(theme)}>
          <Box
            component="img"
            src={metLogo}
            alt="met logo"
            sx={{
              padding: 0,
              paddingTop: {
                md: 0,
                sm: 1,
              },
              paddingBottom: {
                md: 0,
                sm: 1,
              },
              width: 200,
            }}
          />
          <Box
            component="div"
            sx={{ flexGrow: 1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize={35}
          >
            Annotated Atlas
          </Box>
          <IconButton
            sx={{ color: 'primary.contrastText' }}
            aria-label="Open drawer"
          >
            <SearchIcon />
          </IconButton>
          <Menu />
          <UserInfo />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
