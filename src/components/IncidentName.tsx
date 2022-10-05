import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import databaseFunctions from '../utils/databaseFunctions';
import { Box, Typography } from '@mui/material';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const IncidentName: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [names, setNames] = React.useState([]);

  useEffect(() => {
    databaseFunctions
      .getIncidentNamesList()
      .then((response) => setNames(response.data));
  }, []);

  const optionList = [];
  for (let i = 0; i < names.length; i += 1) {
    optionList[i] = {
      value: names[i],
      label: names[i],
    };
  }

  const onChange = () => {
    const phenomSearch = { ...searchObject };
    setSearchObject(phenomSearch);
  };

  return (
    <Box>
      <CreatableSelect
        isClearable
        placeholder={'Incident Names (None functional in prototype)'}
        onChange={onChange}
        options={optionList}
        /*isDisabled*/
      />
      <Typography variant="caption">
        A list of named extreme weather conditions
      </Typography>
    </Box>
  );
};

export default IncidentName;
