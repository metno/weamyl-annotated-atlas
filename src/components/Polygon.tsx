import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Box, TextField } from '@mui/material';
import mapCoordinates from 'geojson-apply-right-hand-rule';
// @ts-ignore
import toBBox from 'geojson-bounding-box';
import databaseFunctions from '../utils/databaseFunctions';
import Select from 'react-select';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

const Polygon: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  function parsePolygon(polygonString: any) {
    // Parse polygon from Diana
    // example1
    // "(62.6145, 8.55212) (59.4469, 10.8924) (63.6052, 10.466) (63.7827, 10.3753) ";
    // example2
    // (63.1588, 6.49994) (62.7406, 4.13511)(60.3196, 8.44676) (61.4481, 9.74944) (61.311, 9.83574)

    const pattern: RegExp = /\d{1,2}\d.{1,6}, -?\d{1,2}.\d{1,6}/g;
    const array = [...polygonString.matchAll(pattern)];

    let corners = array.map((item) => item[0].split(', ').reverse());

    if (corners.length > 2) {
      const latlon = corners.map((corner) => [
        parseFloat(corner[0]),
        parseFloat(corner[1]),
      ]);

      let geometry = mapCoordinates(latlon);
      geometry = { ...geometry, bbox: toBBox(geometry) };
      const phenomSearch = {
        ...searchObject,
        cutoff: 0.5,
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry,
          },
        ],
      };
      console.log('SEARCH: ', phenomSearch);
      setSearchObject(phenomSearch);
    }
  }

  const onPolygonChange = (event: any) => {
    const newValue = event.target.value;
    parsePolygon(newValue);
  };

  const [customAreaNames, setCustomAreaNames] = React.useState([]);

  useEffect(() => {
    databaseFunctions
      .getCustomAreaList()
      .then((response) => setCustomAreaNames(response.data));
  }, []);

  const optionList = [];
  for (let i = 0; i < customAreaNames.length; i += 1) {
    optionList[i] = {
      value: customAreaNames[i],
      label: customAreaNames[i],
    };
  }

  const onChange = (option: any) => {
    const customAreaSearch = { ...searchObject, customArea: option.value };
    setSearchObject(customAreaSearch);
    console.log(customAreaSearch);
  };

  return (
    <Stack direction="row" spacing={3}>
      <Select
        placeholder={'Area name'}
        options={optionList}
        onChange={onChange}
      />
      <TextField placeholder={'Polygon'} onChange={onPolygonChange} />
    </Stack>
  );
};

export default Polygon;
