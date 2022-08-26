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

  let searchParameters = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [7.91015625, 63.51427544737998],
              [5.09765625, 61.95961583829658],
              [4.998779296875, 61.60639637138628],
              [6.328125, 60.63548951646859],
              [9.228515625, 60.973107109199404],
              [10.283203125, 61.81466389468391],
              [9.700927734375, 62.58322502941986],
              [7.91015625, 63.51427544737998],
            ],
          ],
        },
      },
    ],
  };

  console.log('TESTING ', searchParameters);

  let update = {
    ...searchParameters,
    colour: 'Red',
  };

  console.log('MER TESTING ', update);

  let secUpdate = {
    ...update,
    ...(searchParameters.features = [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [10.2777099609375, 60.12509169336166],
              [10.1019287109375, 59.620547310812206],
              [11.4202880859375, 59.598315739492335],
              [11.2939453125, 60.06758154285835],
              [10.2777099609375, 60.12509169336166],
            ],
          ],
        },
      },
    ]),
  };

  console.log('ENDA MER TESTING ', secUpdate);

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
            <Colour />
            <Severity />
            <Time />
            <Buttons setWarning={setWarning} secUpdate={secUpdate} />
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
