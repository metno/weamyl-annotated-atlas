import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { TextField, Typography } from '@mui/material';
import mapCoordinates from 'geojson-apply-right-hand-rule';
// @ts-ignore
import toBBox from 'geojson-bounding-box';
import databaseFunctions from '../utils/databaseFunctions';
import Select from 'react-select';

type Props = {
  searchObject: object;
  setSearchObject: any;
};

/**
 * Parses a polygon string in the format "(lat, lon) (lat, lon) ..."
 * and updates the search object with a GeoJSON FeatureCollection.
 *
 * Example input:
 *   "(63.1588, 6.49994) (62.7406, 4.13511) (60.3196, 8.44676)
 *       (61.4481, 9.74944) (61.311, 9.83574)"
 *
 * If the parsed polygon has more than two points, the coordinates
 * are converted into a right-hand-rule polygon with a bounding box
 * and stored in the `features` field of the search object.
 * 
 * If the input is invalid or empty, the geometry is cleared.
 *
 * @param polygonString - The string representing the polygon points.
 * @param searchObject - The current state of the search object.
 * @param setSearchObject - Setter function to update the search object.
 */

export function parsePolygon(polygonString: any, searchObject: any, setSearchObject: any) {
 
    let phenomSearch= {};

    if (polygonString) {
      const pattern: RegExp =  /[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?((1[0-7]\d|[1-9]?\d)(\.\d+)?|180(\.0+)?)/g;
      const array = [...polygonString.matchAll(pattern)];
      let corners = array.map((item) => item[0].split(', ').reverse());

      if (corners.length > 2) {
        const latitudeLongitude = corners.map((corner) => [
          parseFloat(corner[0]),
          parseFloat(corner[1]),
        ]);
        let geometry = mapCoordinates(latitudeLongitude);
        geometry = { ...geometry, bbox: toBBox(geometry) };
        phenomSearch = {
          ...searchObject,
          cutoff: 0.5,
          type: 'FeatureCollection',
          features: [{ type: 'Feature', properties: {}, geometry }],
        };
      }
    } else {
      phenomSearch = {
        ...searchObject,
        cutoff:null,
        type: null,
        features: null,
      };
    }

    setSearchObject(phenomSearch);
  }

const Polygon: React.FC<Props> = ({ searchObject, setSearchObject }) => {
  
  const onPolygonChange = (event: any) => {
    const newValue = event.target.value;
    parsePolygon(newValue, searchObject, setSearchObject);
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

  return (
    <Stack direction="row" spacing={3}>
      <Stack>
        <TextField
          placeholder={'Polygon'}
          onChange={onPolygonChange}
          helperText="Only works with polygons like (61.2481, 5.45023) (58.9953,
          9.23162) (61.6041, 11.5993)"
        />
      </Stack>
    </Stack>
  );
};

export default Polygon;
