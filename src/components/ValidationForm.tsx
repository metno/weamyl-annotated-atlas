import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Select from 'react-select';
import Stack from '@mui/material/Stack';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

type Props = {
  attachmentJSON: any;
};

const ValidationForm: React.FC<Props> = (props) => {
  const { attachmentJSON } = props;

  console.log(attachmentJSON);

  /*const optionList = [{
    value: green,
    label: green,
    value: customAreaNames[i],
    label: customAreaNames[i],
    value: customAreaNames[i],
    label: customAreaNames[i],
  }];
*/
  return (
    <Box>
      <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
          <TextField
            label="Phenomena of current warning"
            value={attachmentJSON.phenom}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          <TextField
            value={attachmentJSON.colour}
            label="Colour of current warning"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Select placeholder={'Korrigert verdi'} />
        </Stack>
        <Stack direction="row" spacing={3}>
          <TextField
            id="no"
            label={'Fritekst'}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            minRows={6}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ValidationForm;
