import React from 'react';
import { Button } from '@mui/material';
import databaseFunctions from '../utils/databaseFunctions';

type Props = {
  setWarning: any;
  searchObject: object;
};

const Buttons: React.FC<Props> = ({ setWarning, searchObject }) => {
  const handleOnClick = () => {
    databaseFunctions
      .getOpenSearch(searchObject)
      .then((response) => setWarning(response.data));
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleOnClick}>
        Search
      </Button>
      <Button variant="contained" color="error">
        Clear
      </Button>
    </>
  );
};

export default Buttons;
