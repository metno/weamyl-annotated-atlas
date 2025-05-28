import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Phenomenon from '../Phenomenon';
import Polygon from '../Polygon';
import Time from '../Time';
import CapTableSort from '../CapTableSort';
import SearchClearButtons from '../SearchClearButtons';
import Colour from '../Colour';
import { CapFileEntryList } from '../../@customTypes/CapFilEntries';
import MapLeaf from '../MapLeaf';
import test from '../../config/test1.json';
import ValidationForm from '../ValidationForm';
import CountyName from '../CountyList';
import IncNumber from '../IncNumber'

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

const Home: React.FC = () => {
  const [warning, setWarning] = React.useState<CapFileEntryList>([]);
  const [searchObject, setSearchObject] = React.useState<object>({onset: '2016-01-01T00:00',});
  const [polygonObject, setPolygonObject] = React.useState<object>(test);
  const [attachmentXML, setAttachmentXML] = React.useState<object>([]);
  const [savedEvaluationForm, setSavedEvaluationForm] = React.useState<object>([]);
  const [isSaved,setIsSaved] = React.useState(true);
  
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

        {/* *********Search Parameters********* */}

        <Grid item md={12} lg={6}>
        <Paper sx={paperStyle} style={{ height: 400, overflow: 'auto' }}>
          <Typography variant="h5" gutterBottom>
            Search parameters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Phenomenon
                searchObject={searchObject}
                setSearchObject={setSearchObject}
              />
            </Grid>
            <Grid item xs={6}>
              <Colour
                searchObject={searchObject}
                setSearchObject={setSearchObject}
              />
            </Grid>
            <Grid item xs={6}>
              <CountyName
                searchObject={searchObject}
                setSearchObject={setSearchObject}
              />
            </Grid>
            <Grid item xs={6}>
              <Polygon
                searchObject={searchObject}
                setSearchObject={setSearchObject}
              />
            </Grid>
            <Grid item xs={6}>
              <Time
                searchObject={searchObject}
                setSearchObject={setSearchObject}
              />
            </Grid>
            <Grid item xs={6}>
              <IncNumber
                searchObject={searchObject}
                setSearchObject={setSearchObject}
              />
            </Grid>
            <Grid item xs={12}>
              <SearchClearButtons
                setWarning={setWarning}
                searchObject={searchObject}
              />
            </Grid>
          </Grid>
        </Paper>
        </Grid>

        {/* *********Results list********* */}

        <Grid item md={12} lg={6}>
          <Paper
            sx={paperStyle}
            style={{ height: 400, maxHeight: 400 }}
          >
            <CapTableSort
              warning={warning}
              setPolygonObject={setPolygonObject}
              setAttachmentXML={setAttachmentXML}
              setSavedEvaluationForm={setSavedEvaluationForm}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
            />
          </Paper>
        </Grid>

        {/* *********Leaflet Map********* */}

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

        {/* *********Annotation Form********* */}

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
              attachmentXML={attachmentXML}
              savedEvaluationForm={savedEvaluationForm}
              setSavedEvaluationForm={setSavedEvaluationForm}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
            />
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Home;
