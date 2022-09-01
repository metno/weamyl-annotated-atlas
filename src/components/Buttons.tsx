import React from 'react';
import { Button } from '@mui/material';
import testSearch from '../config/searchjson.json';
import databaseFunctions from '../utils/databaseFunctions';
import { CapFileEntryList, CapFilEntries } from '../@customTypes/CapFilEntries';

type Props = {
  setWarning: any;
  openSearch: object;
};

const Buttons: React.FC<Props> = ({ setWarning, openSearch }) => {
  console.log('testSearch ', openSearch);

  const handleOnClick = () => {
    databaseFunctions
      .getOpenSearch(openSearch)
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
