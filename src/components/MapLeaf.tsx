import React from 'react';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';

export default function MapLeaf() {
  // Default coordinates set to Oslo central station
  const position: LatLngExpression = [59.91174337077401, 10.750425582038146];
  const zoom: number = 4;

  const polygon: [number, number][] = [
    [51.515, -0.09],
    [62.52, -0.1],
    [51.52, 10.12],
  ];

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={true}>
      <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        // Placeholder, we'll put our markers here
      }
      <Polygon positions={polygon} />
    </MapContainer>
  );
}
