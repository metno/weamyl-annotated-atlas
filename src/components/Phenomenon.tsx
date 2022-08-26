import React from 'react';
import CreatableSelect from 'react-select/creatable';
import phenomena from '../config/Phenomena.json';
import { Box } from '@mui/material';

const Phenomenon: React.FC = () => {
  const optionList = [];
  const phenomValues = Object.values(phenomena);
  for (let i = 0; i < phenomValues.length; i += 1) {
    optionList[i] = {
      value: Object.values(phenomValues)[i].guiName.en,
      label: Object.values(phenomValues)[i].guiName.en,
    };
  }
  console.log(' Fenomen ', optionList);

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <CreatableSelect
        isClearable
        placeholder={'Phenomenon'}
        options={optionList}
      />
    </Box>
  );
};

export default Phenomenon;
