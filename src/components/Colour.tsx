import React from 'react';
import CreatableSelect from 'react-select/creatable';
import colours from '../config/colour.json';
import { Box } from '@mui/material';

type Props = {
  openSearch: object;
  searchObject: object;
  setSearchObject: object;
};

const Colour: React.FC<Props> = (props) => {
  const { openSearch, searchObject, setSearchObject } = props;

  const handleChange = (option: any) => {
    console.log(option.value);
    let colourChosen = {
      ...openSearch,
      colour: option.value,
    };
    console.log('color', colourChosen);
    //setSearchObject(colourChosen);
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
