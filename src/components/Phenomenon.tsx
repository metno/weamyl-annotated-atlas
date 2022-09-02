import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Box } from '@mui/material';
import databaseFunctions from '../utils/databaseFunctions';

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
      <CreatableSelect
        placeholder={'Phenomenon'}
        options={optionList}
        onChange={onChange}
      />
    </Box>
  );
};

export default Phenomenon;
