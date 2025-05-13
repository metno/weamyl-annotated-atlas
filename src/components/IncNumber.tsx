import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';

type Props = {
  searchObject: Record<string, any>;
  setSearchObject: (obj: Record<string, any>) => void;
};

const IncNumber: React.FC<Props> = ({ searchObject, setSearchObject }) => {
    const [error, setError] = useState(false);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('OPTION: ', event.target.value);
        const input = event.target.value;
        const isValid = /^\d{0,10}$/.test(input);

        if (isValid) {
            setSearchObject({ ...searchObject, incidentId: input });
            console.log('??: ', searchObject);
        }
        setError(input.length > 0 && input.length !== 10);
    };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        placeholder="Incident Number"
        value={searchObject.incidentId || ''}
        onChange={onChange}
        label="Incident Number"
        variant="outlined"
        error={error}
        helperText={error ? 'Incident number must be exactly 10 digits' : ' '}
        inputProps={{ maxLength: 10 }}
      />
    </Box>
  );
};

export default IncNumber;
