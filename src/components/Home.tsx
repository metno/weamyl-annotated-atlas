import React from 'react';
import { getNonesenseText } from '../utils/randomText';
import { Box, Grid, Paper, Typography } from '@mui/material';
import ObservationTable from './ObservationTable';
import { createRandomObs } from '../utils/randomObs';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  return (
    <Box
      component="div"
      sx={{
        flexGrow: 1,
        margin: 0,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              textAlign: 'center',
              padding: 2,
            }}
          >
            <Box
              component="img"
              alt={'description of example image'}
              src={'images/example.png'}
              sx={{ maxWidth: '100%' }}
            />
          </Paper>
        </Grid>

        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle}>
            <ObservationTable
              locationName="Bergen"
              observations={createRandomObs(5)}
            />
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle}>
            <Typography>{getNonesenseText(1)}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper sx={paperStyle}>
            <Typography>{getNonesenseText(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper sx={paperStyle}>
            <Typography>{getNonesenseText(3)}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper sx={paperStyle}>
            <Typography>{getNonesenseText(4)}</Typography>
          </Paper>
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper sx={paperStyle}>
            <Typography>{getNonesenseText(5)}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
