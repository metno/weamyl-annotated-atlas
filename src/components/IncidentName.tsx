import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import jsonNames from '../config/incidentNames.json';
import databaseFunctions from '../utils/databaseFunctions';
import { Box } from '@mui/material';

type Props = {
  warning: any;
  setWarning: any;
};

const IncidentName: React.FC<Props> = (props) => {
  const { setWarning, warning } = props;
  const [names, setNames] = React.useState([]);

  useEffect(() => {
    databaseFunctions
      .getIncidentNamesList()
      .then((response) => setNames(response.data));
  }, []);

  const onChange = (option: any) => {
    console.log('What I Chose ', option.value);
    // updateSearchParamaters({ ...searchParamaters, incidentName: option.value });

    // This call does not belong here
    databaseFunctions
      .getWarningsFromIncidentNames(option.value)
      .then((response) => setWarning(response.data[0]));
    console.log('top', warning);
  };

  const name1 = {
    value: names[1],
    label: names[1],
  };

  //console.log('Liste ', names);
  //console.log('json ', jsonNames);
  //console.log('Lost ', name1);
  //console.log('Nu da? ', Object.values(name1));

  return (
    <Box>
      <CreatableSelect
        placeholder={'Incident Names'}
        onChange={onChange}
        options={jsonNames}
      />
    </Box>
  );
};

export default IncidentName;
