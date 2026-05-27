import React from 'react';
import { Button } from '@mui/material';
import databaseFunctions from '../utils/databaseFunctions';

type Props = {
  setWarning: any;
  searchObject: object;
  setIsLoading: (loading: boolean) => void;
  onSearch?: () => void;
};

const SearchClearButtons: React.FC<Props> = ({
  setWarning,
  searchObject,
  setIsLoading,
  onSearch,
}) => {
  const onSearchClick = () => {
    // filter out empty elements from the json
    const filteredData = Object.entries(searchObject).reduce((x, [k, v]) => {
      if (v) {
        // not ( null, undefined, empty string)
        x[k] = v;
      }
      return x;
    }, {} as any);
    onSearch?.();
    setIsLoading(true);
    databaseFunctions
      .getOpenSearch(filteredData)
      .then((response) => {
        setWarning(response);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
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

export default SearchClearButtons;
