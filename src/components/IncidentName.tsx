import React from 'react';
import CreatableSelect from 'react-select/creatable';
import names from '../config/incidentNames.json';
import databaseFunctions from '../utils/databaseFunctions';

const IncidentName: React.FC = () => {
  const [warning, setWarning] = React.useState<object>();
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
        isClearable
        placeholder={'Incident Names'}
        onChange={onChange}
        options={names}
      />
    </>
  );
};

export default IncidentName;
