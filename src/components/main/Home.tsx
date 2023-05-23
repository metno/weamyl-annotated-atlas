import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Phenomenon from '../Phenomenon';
import Polygon from '../Polygon';
import Time from '../Time';
import IncidentName from '../IncidentName';
import CapTable from '../CapTable';
import SearchClearButtons from '../SearchClearButtons';
import Colour from '../Colour';
import { CapFileEntryList } from '../../@customTypes/CapFilEntries';
import MapLeaf from '../MapLeaf';
import test from '../../config/test1.json';
import ValidationForm from '../ValidationForm';
import dayjs from 'dayjs';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<CapFileEntryList>([]);
  const [searchObject, setSearchObject] = React.useState<object>({
    onset: '2016-01-01T00:00',
    expires: dayjs().format('YYYY-MM-DDTHH:mm'),
  });
  const [polygonObject, setPolygonObject] = React.useState<object>(test);
  const [attachmentJSON, setAttachmentJSON] = React.useState<object>([]);
  const [attachmentXML, setAttachmentXML] = React.useState<object>([]);
  const [savedEvaluationForm, setSavedEvaluationForm] = React.useState<object>(
    [],
  );

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
        <Grid item md={12} lg={6}>
          <Paper sx={paperStyle} style={{ height: 400 }}>
            <Typography variant="h5">Search parameters</Typography>
            <Phenomenon
              searchObject={searchObject}
              setSearchObject={setSearchObject}
            />
            <IncidentName
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
            <SearchClearButtons
              setWarning={setWarning}
              searchObject={searchObject}
            />
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
          <Paper
            sx={paperStyle}
            style={{ height: 400, maxHeight: 400, overflow: 'auto' }}
          >
            <CapTable
              warning={warning}
              setPolygonObject={setPolygonObject}
              setAttachmentJSON={setAttachmentJSON}
              setAttachmentXML={setAttachmentXML}
              setSavedEvaluationForm={setSavedEvaluationForm}
            />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            sx={paperStyle}
            style={{ height: 700, maxHeight: 700, overflow: 'auto' }}
          >
            <Box>
              <MapLeaf polygonObject={polygonObject} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper
            sx={{
              textAlign: 'center',
              padding: 2,
            }}
            style={{ height: 700, maxHeight: 700, overflow: 'auto' }}
          >
            <Typography variant="h5">Selected warning to annotate</Typography>
            <ValidationForm
              attachmentJSON={attachmentJSON}
              savedEvaluationForm={savedEvaluationForm}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
