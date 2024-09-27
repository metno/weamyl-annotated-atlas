import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import phenomena from '../config/phenomena.json';
import databaseFunctions from '../utils/databaseFunctions';
import { useAuth } from 'react-oidc-context';
import CloseIcon from '@mui/icons-material/Close';
import { Phenomena } from '../@customTypes/Phenomena';
import CustomDropdown from './CustomDropdown';



const paperStyle = {
  padding: 2,
  textAlign: 'left',
};
type EvaluationFormType = {
  colour?: string;
  windDirection?: string;
  accuracy?: string;
  comments?:string;
  overallEvaluation?:number;
  timeEvaluation?:number;
  areaEvaluation?:number;
  warningSentOutEvaluation?:number;
  _id?: string;
  _rev?: string;
};
type Props = {
  attachmentXML: any;
  savedEvaluationForm: EvaluationFormType | null;
  setSavedEvaluationForm:any
};

const ValidationForm: React.FC<Props> = (props) => {
  const { attachmentXML, savedEvaluationForm } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [evaluationForm, setEvaluationForm] = React.useState<EvaluationFormType>(savedEvaluationForm || {});
  useEffect(() => {
    if (savedEvaluationForm) {
      setEvaluationForm(savedEvaluationForm);
    }
  }, [savedEvaluationForm]);
  
  let evaluationObject = {};
  
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
  
  const auth = useAuth();

  const onClickSave = () => {
    if (auth.isAuthenticated) {
      evaluationObject = {
        ...evaluationForm,
        _id: attachmentXML.identifier,
        phenomenon: attachmentXML.phenomenon,
      };
      databaseFunctions
        .putEvaluationForm(evaluationObject)
        .then((r) => console.log('return value ', r));
    } else {
      setOpen(true);
    }
  };
  const onClickCancel = () => {
    if (savedEvaluationForm) {
      setEvaluationForm(savedEvaluationForm);
    }
    
  };
  
  const handleDropdownChange = (field: keyof EvaluationFormType) => (newValue: string | number | null) => {  
    setEvaluationForm((prevForm) => ({
      ...prevForm,
      [field]: newValue,
    }));
  };

  const onChangeComments = (field: keyof EvaluationFormType) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setEvaluationForm((prevForm) => ({
        ...prevForm,
        [field]: newValue,
      }));
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
              value={attachmentXML.phenomenon||''}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {attachmentXML?.phenomenon === 'Wind gusts' && (
              
             <CustomDropdown
              label="Wind Direction"
              options={windDirection}
              value={evaluationForm.windDirection|| ''}
              onChange={handleDropdownChange('windDirection')}
            />
              )}
                         
          </Stack>

          <Stack direction="row" spacing={3}>
            <TextField
              value={currentWarningColour||''}
              label="Colour of current warning"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomDropdown
              label="Annotated correct colour of warning level"
              options={colourOptionList}
              value={evaluationForm.colour||''}
              onChange={handleDropdownChange('colour')}
            />
                 
          </Stack>

          <Stack direction="row" spacing={3}>
            <TextField
              value={attachmentXML.threshold||''}
              label="Threshold of current warning"
              InputLabelProps={{
                shrink: true,
              }}
            />         
          </Stack>
        </Box>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '150ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Stack direction="row" spacing={6}>
            <TextField 
            label={'Comment to Annotation'} 
            variant="outlined" 
            InputLabelProps={{
            shrink: true,
            }}
            multiline
            minRows={6}
            value={evaluationForm.comments||''}
            onChange={onChangeComments('comments')}

            />
        
          </Stack>
        </Box>
          
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <Stack direction="row" spacing={3}>
          
          <CustomDropdown
              label="Evaluation of consequences (of current warning level)"
              options={evaluationList}
              value={evaluationForm.overallEvaluation||''}
              onChange={handleDropdownChange('overallEvaluation')}
            />
          <CustomDropdown
              label="Accuracy of timing"
              options={evaluationList}
              value={evaluationForm.timeEvaluation||''}
              onChange={handleDropdownChange('timeEvaluation')}
            />    
          <CustomDropdown
              label="Accuracy of area"
              options={evaluationList}
              value={evaluationForm.areaEvaluation||''}
              onChange={handleDropdownChange('areaEvaluation')}
            />    
          
          <CustomDropdown
              label="When was warning sent out"
              options={evaluationList}
              value={evaluationForm.warningSentOutEvaluation||''}
              onChange={handleDropdownChange('warningSentOutEvaluation')}
            />
          

        </Stack>
        </Box>
      </Stack>

      <Button variant={'contained'} color={'success'} onClick={onClickSave}>
        Save
      </Button>
      <Button variant={'contained'} color={'error'}onClick={onClickCancel}>
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
