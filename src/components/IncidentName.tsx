import React from "react";
import CreatableSelect from "react-select/creatable";
import { SingleValue, ActionMeta } from "react-select/dist/declarations/src";
import names from '../config/incidentNames.json';
import databaseFunctions from '../utils/databaseFunctions';

const name: string = 'Muninn';
const testImport = databaseFunctions.getWarningsFromIncidentNames(name);
console.log(testImport);

const IncidentName: React.FC = () => {
  const onChange = (option: any | null) => {
    console.log(option);
  }
  return (
    <>
      <CreatableSelect
        isClearable
        placeholder={'Incident Names'}
        onChange={onChange}
        options={names}
      />
    </>
  )
}

export default IncidentName;