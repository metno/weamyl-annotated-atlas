import React from 'react';
import { Box, Grid, Paper } from '@mui/material';
import Phenomenon from '../Phenomenon';
import Polygon from '../Polygon';
import Time from '../Time';
import IncidentName from '../IncidentName';
import CapTable from '../CapTable';
import Buttons from '../Buttons';
import Incidents from '../Incidents';
import Severity from '../Severity';
import Colour from '../Colour';
import { CapFileEntryList } from '../../@customTypes/CapFilEntries';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<CapFileEntryList>([]);
  const [searchObject, setSearchObject] = React.useState<object>({});
  const [nullObject, setNullObject] = React.useState<boolean>(false);

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
          {/*<Paper
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
          </Paper>*/}
        </Grid>

        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle}>
            <IncidentName
              searchObject={searchObject}
              setSearchObject={setSearchObject}
            />
            <Phenomenon
              searchObject={searchObject}
              setSearchObject={setSearchObject}
            />
            <Polygon
              searchObject={searchObject}
              setSearchObject={setSearchObject}
            />
            <Colour
              searchObject={searchObject}
              setSearchObject={setSearchObject}
            />
            <Time
              searchObject={searchObject}
              setSearchObject={setSearchObject}
              nullObject={nullObject}
              setNullObject={setNullObject}
            />
            <Buttons
              setWarning={setWarning}
              searchObject={searchObject}
              nullObject={nullObject}
              setNullObject={setNullObject}
            />
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
