import React from 'react';
import CreatableSelect from 'react-select/creatable';
import colours from '../config/colour.json';
import { Box } from '@mui/material';

const Colour: React.FC = () => {
  const handleChange = (option: any) => {
    console.log(option.value);
    const chosenColour = option.value;
    // updateSearchParamaters('colour': chosenColour);
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <CreatableSelect
        isClearable
        placeholder={'Colour'}
        options={colours}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Colour;
