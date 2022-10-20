import React from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

type Props = {
  polygonObject: object;
};

const MapLeaf: React.FC<Props> = (props) => {
  const { polygonObject } = props;
  // const position: LatLngExpression = [52.5200066, 6.8801032]; // Berlin
  const position: LatLngExpression = [64, 11]; // Namsos
  const zoom: number = 4.5;

  const MyData = () => {
    const [data, setData] = React.useState();
    const [colour, setColour] = React.useState();

    React.useEffect(() => {
      // @ts-ignore
      const data: GeoJSON.Feature = polygonObject.features[0];
      // @ts-ignore
      const colour: GeoJSON.Feature = polygonObject.colour;
      // @ts-ignore
      setData(data);
      // @ts-ignore
      setColour(colour);
    }, []);

    if (data) {
      return <GeoJSON pathOptions={{ color: colour }} data={data} />;
    } else {
      return null;
    }
  };

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        // Placeholder, we'll put our markers here
      }
      <MyData />
    </MapContainer>
  );
};
export default MapLeaf;
