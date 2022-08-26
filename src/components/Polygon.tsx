import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Stack from '@mui/material/Stack';
import { Box, TextField } from '@mui/material';

const Polygon: React.FC = () => {
  /*
  function parsePolygon(polygonString: any) {
    console.log('parsePolygon', polygonString);
    let mygeojson = {};
    // Parse polygon from Diana
    // example1
    // "(62.6145, 8.55212) (59.4469, 10.8924) (63.6052, 10.466) (63.7827, 10.3753) ";
    // example2
    // (63.1588, 6.49994) (62.7406, 4.13511)(60.3196, 8.44676) (61.4481, 9.74944) (61.311, 9.83574)

    const regexp = '(\\d{1,2}\\d.{1,6}, -?\\d{1,2}.\\d{1,6})';

    const array = [...polygonString.matchAll(regexp)];

    let corners = array.map((item) => item[0].split(', ').reverse());

    if (corners.length > 2) {
      console.log('corners.length>2');
      const latlon = corners.map((corner) => [
        parseFloat(corner[0]),
        parseFloat(corner[1]),
      ]);
      let geometry = mapCoordinates(latlon);
      geometry = { ...geometry, bbox: toBBox(geometry) };
      mygeojson = {
        type: 'Feature',
        geometry,
        properties: {
          customArea: false,
          area: '',
        },
      };
      console.log('mygeojson', mygeojson);
    }
    return mygeojson;
  }
  const onChange = (option: any) => {
    console.log('handleChangePolygon, start');
    const newValue = option.value;
    const localGeojson = parsePolygon(newValue);
    if ('geometry' in localGeojson) {
      if (gjv.valid(localGeojson)) {
        const newFeatures = [localGeojson];
        updateWarning('features', newFeatures);
        updateWarning('municipalities', []);
        updateWarning('counties', []);
        setErrorMessage('');
      } else {
        console.log('geojson is NOT valid GeoJSON!');
        const trace = gjv.isFeature(localGeojson, true);
        setErrorMessage(
          <>
            Not possible to create valid GeoJSON!
            <br />
            {trace}
          </>,
        );
      }
    } else {
      setErrorMessage(
        <>
          Du fors�kte � lime inn et ugyldig polygon!
          <br />
          {newValue}
        </>,
      );
    }
  };
*/
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack direction="row" spacing={3}>
        <TextField
          fullWidth
          placeholder={'Area name'}
          //onChange={onChange}
        />
        <TextField
          fullWidth
          placeholder={'Polygon'}
          //onChange={onChange}
        />
      </Stack>
    </Box>
  );
};

export default Polygon;
