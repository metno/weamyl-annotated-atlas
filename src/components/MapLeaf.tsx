import React from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

type Props = {
  polygonObject: object | null;
};

const MapLeaf: React.FC<Props> = (props) => {
  const { polygonObject } = props;
  const position: LatLngExpression = [65, 17]; // Center of Norway
  const zoom: number = 4.6;

  return (
    <MapContainer center={position} zoom={zoom} zoomSnap={0.1} scrollWheelZoom={true}>
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polygonObject && (
        <GeoJSON
          key={JSON.stringify(polygonObject)}
          // @ts-ignore
          pathOptions={{ color: polygonObject.colour }}
          // @ts-ignore
          data={polygonObject}
        />
      )}
    </MapContainer>
  );
};
export default MapLeaf;
