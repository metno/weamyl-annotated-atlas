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
import polly from '../config/searchjson.json';
import { CapFileEntryList } from '../@customTypes/CapFilEntries';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<CapFileEntryList>([]);
  const [searchObject, setSearchObject] = React.useState<object>({});

  let update = {
    //colour: 'Orange',
    //phenomenon: 'Rain',
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
              [11.271972656249998, 62.08331486294795],
              [4.010009765624999, 60.98376689595989],
              [6.218261718749999, 57.79794388498275],
              [12.447509765625, 59.34999582510769],
              [12.645263671875, 61.559342106132064],
              [11.271972656249998, 62.08331486294795],
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
            <Buttons setWarning={setWarning} openSearch={polly} />
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle}>
            <CapTable warning={warning} />
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
