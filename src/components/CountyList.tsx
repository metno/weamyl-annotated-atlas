import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import databaseFunctions from '../utils/databaseFunctions';
import { Box, Typography } from '@mui/material';
import Select from 'react-select';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const CountyName: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [county, setCounty] = React.useState([]);

  useEffect(() => {
    databaseFunctions
    .getCountyList()
      .then((response) => setCounty(response.data));
  }, []);

  const optionList = [];
  for (let i = 0; i < county.length; i += 1) {
    optionList[i] = {
      value: county[i],
      label: county[i],
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
        placeholder={'County Names'}
        onChange={onChange}
        options={optionList}
      />
      <Typography variant="caption">
        A list of counties
      </Typography>
    </Box>
  );
};

export default CountyName;
