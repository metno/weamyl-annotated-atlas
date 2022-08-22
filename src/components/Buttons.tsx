import React from 'react';
import { Button } from '@mui/material';

const Buttons: React.FC = () => {
  return (
    <>
      <Button variant="contained" color="success">
        Search
      </Button>
      <Button variant="contained" color="error">
        Clear
      </Button>
    </>
  );
};

export default Buttons;
