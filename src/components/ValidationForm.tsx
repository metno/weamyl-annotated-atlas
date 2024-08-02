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
import { Phenomena } from '../@customTypes/Phenomena';

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

  console.log('atXML: ', attachmentXML)

  const colourOptionList = [
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
    }
  ];
  const evaluationList = [
    {
        value: 0,
        label: 0,
    },
    {
        value: 1,
        label: 1,
    },
    {
        value: 2,
        label: 2,
    },
    {
        value: 3,
        label: 3,
    },
    {
        value: 4,
        label: 4,
    },
    {
        value: 5,
        label: 5,
    }
  ];
  const windDirection = [
    {
        value: 'N',
        label: 'N',
    },
    {
        value: 'NE',
        label: 'NE',
    },
    {
        value: 'E',
        label: 'E',
    },
    {
        value: 'SE',
        label: 'SE',
    },
    {
        value: 'S',
        label: 'S',
    },
    {
        value: 'SW',
        label: 'SW',
    },
    {
        value: 'W',
        label: 'W',
    },
    {
        value: 'NW',
        label: 'NW',
    }
  ];
  let evaluationObject = {};
  const auth = useAuth();

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

  const onChangewindDirection = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, windDirection: option.target.value };
    setEvaluationForm(evaluationObject);
    //console.log(evaluationObject);    
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
    //console.log(evaluationObject);
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
    //console.log(evaluationObject);
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
    //console.log(evaluationForm);
  };

  const onChangeOverall = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, overallEvaluation: option.target.value };
    setEvaluationForm(evaluationObject);
    //console.log(evaluationObject);
  };

  const onChangeTimeAccuracy = (option: any) => {
      if (!option) {
        option = {
          target: option,
          value: '',
        };
      }
      evaluationObject = { ...evaluationForm, timeEvaluation: option.target.value };
      setEvaluationForm(evaluationObject);
      //console.log(evaluationObject);
    };

  const onChangeAreaAccuracy = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, areaEvaluation: option.target.value };
    setEvaluationForm(evaluationObject);
    //console.log(evaluationObject);
  };

  const onChangeWarningSentOut = (option: any) => {
    if (!option) {
      option = {
        target: option,
        value: '',
      };
    }
    evaluationObject = { ...evaluationForm, warningSentOutEvaluation: option.target.value };
    setEvaluationForm(evaluationObject);
    //console.log(evaluationObject);
  };

  const currentWarningColour = 
  attachmentXML && attachmentXML.colour && attachmentXML.severity && attachmentXML.certainty
    ? `${attachmentXML.colour} (${attachmentXML.severity}/${attachmentXML.certainty})`
    : "";

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
          <Stack direction="row" spacing={3}>
            <TextField
              label="Phenomena of current warning"
              value={attachmentXML.phenomenon}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {attachmentXML?.phenomenon === 'Wind gusts' && (
       
              <TextField
                select
                label="Wind direction"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onChangewindDirection}
              >
                {windDirection.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                ))}
              </TextField>
              )}
            {savedEvaluationForm.windDirection}             
          </Stack>

          <Stack direction="row" spacing={3}>
            <TextField
              value={currentWarningColour}
              label="Colour of current warning"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              select
              defaultValue=''
              label="Annotated correct colour of warning level"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeColour}
            >
              {colourOptionList.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {savedEvaluationForm.severity}          
          </Stack>

          <Stack direction="row" spacing={3}>
            <TextField
              value={attachmentXML.threshold}
              label="Threshold of current warning"
              InputLabelProps={{
                shrink: true,
              }}
            />         
          </Stack>
        </Box>

        <TextField
          label={'Comment to Annotation'}
          InputLabelProps={{
          shrink: true,
          }}
          multiline
          minRows={6}
          defaultValue={savedEvaluationForm.comments}
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
            label="Evaluation of consequences (of current warning level)"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeOverall}
          >
            {evaluationList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {savedEvaluationForm.overallEvaluation}

          <TextField
            select
            label="Accuracy of timing"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeTimeAccuracy}
          >
            {evaluationList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {savedEvaluationForm.timeEvaluation}

          <TextField
            select
            label="Accuracy of area"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeAreaAccuracy}
          >
            {evaluationList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {savedEvaluationForm.areaEvaluation}

          <TextField
            select
            label="When was waring sent out"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeWarningSentOut}
          >
            {evaluationList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {savedEvaluationForm.warningSentOutEvaluation}

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
