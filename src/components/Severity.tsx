import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Stack from '@mui/material/Stack';

const Severity: React.FC = () => {
  return (
    <>
      <Stack direction="row" spacing={3}>
        <CreatableSelect
          isClearable
          placeholder={'Severity'}
          //onChange={onChange}
        />
        <CreatableSelect
          isClearable
          placeholder={'Certainty'}
          //onChange={onChange}
        />
      </Stack>
    </>
  );
};

export default Severity;
