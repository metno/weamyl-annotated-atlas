import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Phenomenon from './Phenomenon';
import Select from 'react-select';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};
const ValidationForm: React.FC = () => {
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
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <Select isClearable placeholder={'Phenomenon'} />
              <Typography variant="caption">
                Different kinds of meteorological weather conditions
              </Typography>
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <Select isClearable placeholder={'Phenomenon'} />
              <Typography variant="caption">
                Different kinds of meteorological weather conditions
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ValidationForm;
