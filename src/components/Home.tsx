import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { createRandomObs } from '../utils/randomObs';
import Phenomenon from './Phenomenon';
import Polygon from './Polygon';
import Time from './Time';
import IncidentName from './IncidentName';
import CapTable from './CapTable';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<object>([]);

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
            <IncidentName setWarning={setWarning} warning={warning} />
            <Phenomenon />
            <Polygon />
            <Time />
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle}>
            <CapTable
              warning={warning}
              locationName="Bergen"
              observations={createRandomObs(5)}
            />
          </Paper>
        </Grid>

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
              src={'images/MapPolygon.png'}
              sx={{ maxWidth: '100%' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
