import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Phenomenon from '../Phenomenon';
import Polygon from '../Polygon';
import Time from '../Time';
import IncidentName from '../IncidentName';
import CapTable from '../CapTable';
import Buttons from '../Buttons';
import Colour from '../Colour';
import { CapFileEntryList } from '../../@customTypes/CapFilEntries';
import MapLeaf from '../MapLeaf';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<CapFileEntryList>([]);
  const [searchObject, setSearchObject] = React.useState<object>({});

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
          <Paper sx={paperStyle} style={{ height: 400 }}>
            <Typography variant="h5">Search parameters</Typography>
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
            />
            <Buttons setWarning={setWarning} searchObject={searchObject} />
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper
            sx={paperStyle}
            style={{ height: 400, maxHeight: 400, overflow: 'auto' }}
          >
            <CapTable warning={warning} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <Box>
              <MapLeaf />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
