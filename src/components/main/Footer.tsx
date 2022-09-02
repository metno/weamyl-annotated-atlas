import React from 'react';
import { pageSpacing } from '../../utils/metMuiThemes';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, Grid, IconButton, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        ...pageSpacing(theme),
        color: theme.palette.primary.main,
        marginTop: 8,
        paddingTop: 3,
        paddingBottom: 3,
        bottom: 0,
        backgroundColor: 'primary.contrastText',
        borderTop: '2px solid ' + theme.palette.primary.main,
      })}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={6}
          sx={(theme) => ({
            textAlign: 'center',
            whiteSpace: 'pre-line',
            [theme.breakpoints.up('md')]: {
              textAlign: 'left',
              marginTop: theme.spacing(0),
            },
          })}
        >
          <Typography color={'inherit'}>
            Meteorologisk institutt
            <br />
            Henrik Mohns Plass 1<br />
            0371 Oslo
            <br />
            Telefon 22 96 30 00
            <br />
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={(theme) => ({
            textAlign: 'center',
            marginTop: 2,
            color: theme.palette.primary.main,

            [theme.breakpoints.up('md')]: {
              textAlign: 'right',
              marginTop: 0,
            },
          })}
        >
          <IconButton
            aria-label="MET på Facebook"
            href="https://www.facebook.com/Yr-22652235447/"
            target="_blank"
            color="primary"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            data-testid="twitter-button"
            aria-label="MET på Twitter"
            href="https://twitter.com/Meteorologene"
            target="_blank"
            color="primary"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            aria-label="MET på Instagram"
            href="https://www.instagram.com/yrbilder/"
            target="_blank"
            color="primary"
          >
            <InstagramIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
