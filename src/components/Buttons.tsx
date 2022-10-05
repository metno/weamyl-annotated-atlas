import React from 'react';
import { Button } from '@mui/material';
import databaseFunctions from '../utils/databaseFunctions';

type Props = {
  setWarning: any;
  searchObject: object;
};

const Buttons: React.FC<Props> = ({
  setWarning,
  searchObject,
}) => {
  const onSearchClick = () => {
    databaseFunctions
      .getOpenSearch(searchObject)
      .then((response) => setWarning(response.data));
  };

  const onClearClick = () => {
    window.location.reload();
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={onSearchClick}>
        Search
      </Button>
      <Button variant="contained" color="error" onClick={onClearClick}>
        Clear
      </Button>
    </>
  );
};

export default Buttons;
