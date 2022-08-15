export interface CapFilEntries {
  _id: string;
  _rev: string;
  archived: boolean;
  incident: string;
  author: string;
  onset: string;
  expires: string;
  phenomenon: string;
  status: string;
  colour: string;
  certainty: string;
  severity: string;
  saved_at: string;
  source: string;
  uuid: number;
  areaDesc: { nb: string; en: string };
  altitude: string;
  ceiling: string;
  msgType: string;
  type: 'FeatureCollection';
  features: [
    {
      type: 'Feature';
      geometry: {
        type: 'Polygon';
        coordinates: number[];
        bbox: number[];
      };
      properties: { customArea: boolean; area: string };
    },
  ];
}

export type CapFileEntryList = Array<CapFilEntries>;
