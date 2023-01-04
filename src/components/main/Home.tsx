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
import test from '../../config/test1.json';
import ValidationForm from "../ValidationForm";

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<CapFileEntryList>([]);
  const [searchObject, setSearchObject] = React.useState<object>({});
  const [polygonObject, setPolygonObject] = React.useState<object>(test);

  let showAnnotation: boolean = true;

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
            <CapTable warning={warning} setPolygonObject={setPolygonObject} />
          </Paper>
        </Grid>

        <Grid item xs={showAnnotation ? 6 : 12}>
          <Paper>
            <Box>
              <MapLeaf polygonObject={polygonObject} />
            </Box>
          </Paper>
        </Grid>
        { showAnnotation ? <Grid item xs={6}>
          <Paper
            sx={{
              textAlign: 'center',
              padding: 2,
            }}
          >
            <Typography variant="h5">Selected warning to annotate</Typography>
            <ValidationForm />
          </Paper>
        </Grid> : null}
      </Grid>
    </Box>
  );
};

export default Home;
