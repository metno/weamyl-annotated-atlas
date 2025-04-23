import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import databaseFunctions from '../utils/databaseFunctions';
import { useAuth } from 'react-oidc-context';
import CloseIcon from '@mui/icons-material/Close';
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
  setSavedEvaluationForm:any;
  isSaved:boolean;
  setIsSaved:any;
};

const ValidationForm: React.FC<Props> = (props) => {
  const { attachmentXML, savedEvaluationForm , isSaved, setIsSaved} = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const [evaluationForm, setEvaluationForm] = React.useState<EvaluationFormType>(savedEvaluationForm || {});
  
  useEffect(() => {
    if (savedEvaluationForm) {
      setEvaluationForm(savedEvaluationForm);
    }
  }, [savedEvaluationForm]);
  useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
          if (!isSaved) {
            e.preventDefault();
          }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, [isSaved]);
  
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
        label: "Unable to rate",
    },
    {
        value: 1,
        label: "Very Poor",
    },
    {
        value: 2,
        label: "Poor",
    },
    {
        value: 3,
        label: "Average",
    },
    {
        value: 4,
        label: "Good",

    },
    {
        value: 5,
        label: "Very Good",
    }
  ];
  const consequencesEvaluationList = [
    {
        value: 0,
        label: "Unable to rate",
    },
    {
        value: 1,
        label: "Much less than expected or insignificant",
    },
    {
        value: 2,
        label: "Less than expected",
    },
    {
        value: 3,
        label: "As expected",
    },
    {
        value: 4,
        label: "More than expected",

    },
    {
        value: 5,
        label: "Much more than expected",
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
        .then((r) => console.log(r));
      setIsSaved(true);
      alert('Saved successfully!');

    } else {
      setOpen(true);
    }
  };
  const onClickCancel = () => {
    if (savedEvaluationForm) {
      setEvaluationForm(savedEvaluationForm);
    }
    setIsSaved(true)
  };
  
  const handleDropdownChange = (field: keyof EvaluationFormType) => (newValue: string | number | null) => {
  
    setEvaluationForm((prevForm) => ({
      ...prevForm,
      [field]: newValue,
    }));
    setIsSaved(false)
  };

  const onChangeComments = (field: keyof EvaluationFormType) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      setEvaluationForm((prevForm) => ({
        ...prevForm,
        [field]: newValue,
      }));
      setIsSaved(false)
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
            label={'Observed Consequences'} 
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
              options={consequencesEvaluationList}
              value={evaluationForm.overallEvaluation??null}
              onChange={handleDropdownChange('overallEvaluation')}
            />
          <CustomDropdown
              label="Accuracy of timing"
              options={evaluationList}
              value={evaluationForm.timeEvaluation??null}
              onChange={handleDropdownChange('timeEvaluation')}
            />    
          <CustomDropdown
              label="Accuracy of area"
              options={evaluationList}
              value={evaluationForm.areaEvaluation??null}
              onChange={handleDropdownChange('areaEvaluation')}
            />    
          
          <CustomDropdown
              label="When was warning sent out"
              options={evaluationList}
              value={evaluationForm.warningSentOutEvaluation??null}
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
