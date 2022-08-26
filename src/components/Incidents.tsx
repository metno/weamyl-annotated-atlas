import React from 'react';
import { Box, TextField } from '@mui/material';

const Incidents: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        placeholder={'Incident Id'}
        //onChange={onChange}
      />
    </Box>
  );
};

export default Incidents;
