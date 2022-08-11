export interface CapFilEntries {
  _id: string;
  _rev: string;
  archived: boolean;
  incident: string;
  author: string;
  onset: '2022-07-22T03:00';
  expires: '2022-07-22T18:00';
  phenomenon: string;
  status: string;
  colour: string;
  certainty: string;
  severity: 'Moderate';
  saved_at: '2022-07-21T08:15';
  source: 'farevarseleditor';
  uuid: '';
  areaDesc: { nb: 'Deler av Østlandet'; en: 'Parts of Southeast Norway' };
  altitude: '0ft';
  ceiling: '9000ft';
  msgType: 'Alert';
  type: 'FeatureCollection';
  features: [
    {
      type: 'Feature';
      geometry: {
        type: 'Polygon';
        coordinates: [
          [
            [11.7551, 60.0471],
            [10.7442, 59.8006],
            [9.81558, 59.1828],
            [9.17159, 58.7192],
            [9.88521, 58.8404],
            [10.9308, 58.9488],
            [11.0529, 58.9647],
            [11.1516, 59.0841],
            [11.2791, 59.1078],
            [11.3438, 59.0976],
            [11.4602, 58.8962],
            [11.55, 58.8751],
            [11.6406, 58.9285],
            [11.7769, 59.0856],
            [11.8216, 59.2973],
            [11.6958, 59.6143],
            [11.8661, 59.6537],
            [11.887, 59.6948],
            [11.9378, 59.703],
            [11.9403, 59.7778],
            [11.8823, 59.8414],
            [11.9717, 59.8971],
            [12.0762, 59.886],
            [12.1719, 59.8906],
            [12.4614, 60.0426],
            [11.7551, 60.0471],
          ],
        ];
        bbox: [9.17159, 58.7192, 12.4614, 60.0471];
      };
      properties: { customArea: true; area: '' };
    },
  ];
}
