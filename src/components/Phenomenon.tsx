import React, { useEffect } from 'react';
import {Box, Typography} from '@mui/material';
import databaseFunctions from '../utils/databaseFunctions';
import Select from 'react-select';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const Phenomenon: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [phenomNames, setPhenomNames] = React.useState([]);

  useEffect(() => {
    databaseFunctions
      .getPhenomenaList()
      .then((response) => setPhenomNames(response.data));
  }, []);

  const optionList = [];
  for (let i = 0; i < phenomNames.length; i += 1) {
    optionList[i] = {
      value: phenomNames[i],
      label: phenomNames[i],
    };
  }

  const onChange = (option: any) => {
    const phenomSearch = { ...searchObject, phenomenon: option.value };
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
        placeholder={'Phenomenon'}
        options={optionList}
        onChange={onChange}
      />
      <Typography variant="caption">
        Tabellen viser ikke ekte observasjoner
      </Typography>
    </Box>
  );
};

export default Phenomenon;
