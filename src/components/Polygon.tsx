import React from 'react';
import CreatableSelect from 'react-select/creatable';
import databaseFunctions from '../utils/databaseFunctions';

const testImport = databaseFunctions.getMunicipalities();
console.log(testImport);

const Polygon: React.FC = () => {
  return (
    <>
      <CreatableSelect isClearable placeholder={'Polygon'} />
    </>
  );
};

export default Polygon;
