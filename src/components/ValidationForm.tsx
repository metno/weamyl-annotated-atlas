import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
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
  const [commentOnCAP, setCommentOnCAP] = useState({});

  const onChange = (option: string) => {
    const saveComment = { ...commentOnCAP, option };
    setCommentOnCAP(saveComment);
  };

  const onClickSave = () => {
    console.log('saved');
  };

  type phenomKey = keyof typeof phenomena;
  let selectedPhenom: phenomKey = attachmentJSON.phenom;
  const thresholdsList = phenomena[selectedPhenom];

  console.log(selectedPhenom);

  console.log(thresholdsList);

  const annotated = {
    comment: '',
  };

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
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack>
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
            <TextField
              select
              defaultValue={attachmentJSON.identifier}
              label="Corrected value"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {optionList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" spacing={3}>
            <TextField
              value={attachmentJSON.threshold}
              label="Threshold of current warning"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              label="Corrected value"
              InputLabelProps={{
                shrink: true,
              }}
            >
            </TextField>
          </Stack>

        </Box>
        <TextField
          id="no"
          label={'Comment to selected warning'}
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          minRows={6}
        />
        <TextField
          select
          defaultValue={attachmentJSON.identifier}
          label="Overall evaluation"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>

      <Button variant={'contained'} color={'success'} onClick={onClickSave}>
        Save
      </Button>
      <Button variant={'contained'} color={'error'}>
        Cancel
      </Button>
    </Box>
  );
};

export default ValidationForm;
