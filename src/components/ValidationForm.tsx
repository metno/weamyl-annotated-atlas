import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import phenomena from '../config/phenomena.json';
import databaseFunctions from '../utils/databaseFunctions';
import { useAuth } from 'react-oidc-context';
import CloseIcon from '@mui/icons-material/Close';
import { WidthFull } from '@mui/icons-material';

const paperStyle = {
  padding: 2,
  textAlign: 'left',
};

type Props = {
  attachmentXML: any;
  savedEvaluationForm: any;
};

const ValidationForm: React.FC<Props> = (props) => {
  const { attachmentXML, savedEvaluationForm } = props;
  const [evaluationForm, setEvaluationForm] = React.useState<object>({});
  const [open, setOpen] = React.useState<boolean>(false);
  const colourOptionList = ['Green', 'Yellow', 'Orange', 'Red'];
  const evaluationList = [1, 2, 3, 4, 5];
  let evaluationObject = {};
  const auth = useAuth();
  console.log('INITIAL: ', savedEvaluationForm.colour);
  console.log('OBJ ', Object.values(phenomena))

  const onClickSave = () => {
    if (auth.isAuthenticated) {
      evaluationObject = {
        ...evaluationForm,
        _id: attachmentXML.identifier,
        phenomenon: attachmentXML.phenomenon,
      };
      console.log(evaluationObject);
      databaseFunctions
        .putEvaluationForm(evaluationObject)
        .then((r) => console.log(r));
    } else {
      setOpen(true);
    }
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
              value={savedEvaluationForm.colour}
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
              {phenomena.icing.thresholds.map((option: any) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Box>

        <TextField
          label={'Comment to selected warning'}
          InputLabelProps={{
          shrink: true,
          }}
          multiline
          minRows={6}
          onChange={onChangeComments}
        />

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <Stack direction="row" spacing={3}>
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

          <TextField
            select
            label="Accuracy of timing"
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

          <TextField
            select
            label="Accuracy of area"
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

          <TextField
            select
            label="When was waring sent out"
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
        </Box>
      </Stack>

      <Button variant={'contained'} color={'success'} onClick={onClickSave}>
        Save
      </Button>
      <Button variant={'contained'} color={'error'}>
        Cancel
      </Button>
      <Box sx={{ width: '100%' }}>
        <Collapse in={open}>
          <Alert
            variant="filled"
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            You have to be logged in to save annotations!
          </Alert>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ValidationForm;
