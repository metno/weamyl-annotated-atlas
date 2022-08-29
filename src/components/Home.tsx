import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { createRandomObs } from '../utils/randomObs';
import Phenomenon from './Phenomenon';
import Polygon from './Polygon';
import Time from './Time';
import IncidentName from './IncidentName';
import CapTable from './CapTable';
import Buttons from './Buttons';
import Incidents from './Incidents';
import Severity from './Severity';
import Colour from './Colour';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<object>([]);
  const [searchObject, setSearchObject] = React.useState<object>({});

  let update = {
    //colour: 'Orange',
    phenomenon: 'Rain',
  };

  console.log('MER TESTING ', update);

  let openSearch = {
    ...update,
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [5.95458984375, 62.155240711732425],
              [4.0869140625, 59.65664225341022],
              [6.8994140625, 58.07787626787517],
              [10.04150390625, 58.424729753759124],
              [11.77734375, 59.84481485969105],
              [11.88720703125, 61.25966921642908],
              [9.29443359375, 62.257696189351215],
              [5.95458984375, 62.155240711732425],
            ],
          ],
        },
      },
    ],
  };

  console.log('ENDA MER TESTING ', openSearch);
  //setSearchObject(openSearch);

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
            <Incidents />
            <Phenomenon />
            <Polygon />
            <Colour
              openSearch={openSearch}
              searchObject={searchObject}
              setSearchObject={setSearchObject}
            />
            <Severity />
            <Time />
            <Buttons setWarning={setWarning} openSearch={openSearch} />
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle}>
            <CapTable warning={warning} observations={createRandomObs(5)} />
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
