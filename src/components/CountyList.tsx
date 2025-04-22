import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import databaseFunctions from '../utils/databaseFunctions';
import { Box, responsiveFontSizes, Typography } from '@mui/material';
import Select from 'react-select';
import { parsePolygon } from '../components/Polygon'

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const CountyName: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  const [county, setCounty] = React.useState([]);

  useEffect(() => {
    databaseFunctions
    .getCountyList()
      .then((response) => {
        setCounty(response.data);
    });
  }, []);

  const optionList = [];
  for (let i = 0; i < county.length; i += 1) {
    optionList[i] = {
      value: county[i][1],
      label: county[i][0],
    };
  }

  const onChange = (option: any) => {
    if (option) {
      const selectedCountyId = option.value;
      const selectedCountyName = option.label;
  
      databaseFunctions
      .getlowresCountyPolygon(selectedCountyId)
        .then((response) =>{
          const coordinateArray = response.data.features[0].geometry.coordinates;
          const formattedCoordinates = coordinateArray[0].map(
            // Coordinates are switched to match same format as those copied from Diana
            (coords: number[]) => `(${coords[1]}, ${coords[0]})`
          ).join(' ');
          parsePolygon(formattedCoordinates, searchObject, setSearchObject)
        })
    }
    else{

      option = {
        target: option,
        value: '',
      };
      const selectedCountyId = option.value;
      const selectedCountyName = option.label;
      parsePolygon(null, searchObject, setSearchObject)

    }
    
  };

  return (
    <Box
     sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <Select
        isClearable
        placeholder={'County Names'}
        onChange={onChange}
        options={optionList}
      />
      <Typography variant="caption">
        A list of counties
      </Typography>
    </Box>
  );
};

export default CountyName;
