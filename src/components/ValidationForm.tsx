import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import phenomena from '../config/phenomena.json';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

type Props = {
  attachmentJSON: any;
};

const ValidationForm: React.FC<Props> = (props) => {
  const { attachmentJSON } = props;

  type phenomKey = keyof typeof phenomena;
  let selectedPhenom: phenomKey = attachmentJSON.phenom;
  const thresholdsList = phenomena[selectedPhenom];

  console.log(selectedPhenom);

  console.log(thresholdsList);

  const optionList = [
    {
      value: 'Green',
      label: 'Green',
    },
    {
      value: 'Yellow',
      label: 'Yellow',
    },
    {
      value: 'Orange',
      label: 'Orange',
    },
    {
      value: 'Red',
      label: 'Red',
    },
  ];

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
          <Select placeholder={'Corrected value'} options={optionList} />
        </Stack>
        <Stack direction="row" spacing={3}>
          <TextField
            value={attachmentJSON.threshold}
            label="Threshold of current warning"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Select placeholder={'Corrected value'} />
        </Stack>
        <Stack direction="row" spacing={3}>
          <TextField
            value={attachmentJSON.identifier}
            label="Consequences of selected warning"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={attachmentJSON.identifier}
            label="Corrected value"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        <TextField
          id="no"
          label={'Comment to selected warning'}
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          minRows={6}
        />
      </Stack>
    </Box>
  );
};

export default ValidationForm;
