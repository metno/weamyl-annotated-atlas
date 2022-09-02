import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Box } from '@mui/material';
import databaseFunctions from '../utils/databaseFunctions';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const Colour: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [colourList, setColourList] = React.useState([]);

  useEffect(() => {
    databaseFunctions
      .getColourList()
      .then((response) => setColourList(response.data));
  }, []);

  const optionList = [];
  for (let i = 0; i < colourList.length; i += 1) {
    optionList[i] = {
      value: colourList[i],
      label: colourList[i],
    };
  }

  const onChange = (option: any) => {
    const phenomSearch = { ...searchObject, colour: option.value };
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
        placeholder={'Colour'}
        options={optionList}
        onChange={onChange}
      />
    </Box>
  );
};

export default Colour;
