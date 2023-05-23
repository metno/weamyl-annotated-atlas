import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import phenomena from '../config/phenomena.json';
import databaseFunctions from '../utils/databaseFunctions';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

type Props = {
  attachmentJSON: any;
  attachmentXML: any;
  savedEvaluationForm: any;
};

const ValidationForm: React.FC<Props> = (props) => {
  const { attachmentJSON, attachmentXML, savedEvaluationForm } = props;
  const [evaluationForm, setEvaluationForm] = React.useState<object>({});
  const colourOptionList = ['Green', 'Yellow', 'Orange', 'Red'];
  const evaluationList = [1, 2, 3, 4, 5];
  let evaluationObject = {};

  const onClickSave = () => {
    evaluationObject = {
      ...evaluationForm,
      _id: attachmentXML.identifier,
      phenomenon: attachmentXML.phenomenon,
    };
    console.log(evaluationObject);
    databaseFunctions
      .putEvaluationForm(evaluationObject)
      .then((r) => console.log(r));
  };

  const onChangeColour = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, colour: option.target.value };
    setEvaluationForm(evaluationObject);
    console.log(evaluationObject);
  };

  const onChangeThreshold = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, threshold: option.target.value };
    setEvaluationForm(evaluationObject);
    console.log(evaluationObject);
  };

  const onChangeComments = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = {
      ...evaluationForm,
      comments: option.target.value,
    };
    setEvaluationForm(evaluationObject);
    console.log(evaluationForm);
  };

  const onChangeOverall = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, evaluation: option.target.value };
    setEvaluationForm(evaluationObject);
    console.log(evaluationObject);
  };

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
              value={attachmentXML.phenomenon}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>

          <Stack direction="row" spacing={3}>
            <TextField
              value={attachmentXML.colour}
              label="Colour of current warning"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              defaultValue={savedEvaluationForm.colour}
              label="Corrected value"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeColour}
            >
              {colourOptionList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction="row" spacing={3}>
            <TextField
              value={attachmentXML.threshold}
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
              onChange={onChangeThreshold}
            >
              {phenomena.rain.thresholds.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
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
          onChange={onChangeComments}
        />
        <TextField
          select
          label="Overall evaluation"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChangeOverall}
        >
          {evaluationList.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
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
