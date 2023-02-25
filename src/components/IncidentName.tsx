import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import databaseFunctions from '../utils/databaseFunctions';
import { Box, Typography } from '@mui/material';
import Select from 'react-select';

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

  const onChange = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    const phenomSearch = { ...searchObject, incidentName: option.value };
    setSearchObject(phenomSearch);
  };

  return (
    <Box
     sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <Select
        isClearable
        placeholder={'Incident Names'}
        onChange={onChange}
        options={optionList}
      />
      <Typography variant="caption">
        A list of named extreme weather conditions
      </Typography>
    </Box>
  );
};

export default IncidentName;
