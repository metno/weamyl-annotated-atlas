import React from 'react';
import CreatableSelect from 'react-select/creatable';
import names from '../config/incidentNames.json';
import databaseFunctions from '../utils/databaseFunctions';

type Props = {
  warning: any;
  setWarning: any;
};

const IncidentName: React.FC<Props> = (props) => {
  const { setWarning, warning } = props;
  const onChange = (option: any) => {
    console.log(option.value);
    databaseFunctions
      .getWarningsFromIncidentNames(option.value)
      .then((response) => setWarning(response.data[0]));
    console.log('top', warning);
  };

  return (
    <>
      <CreatableSelect
        placeholder={'Incident Names'}
        onChange={onChange}
        options={names}
      />
    </>
  );
};

export default IncidentName;
