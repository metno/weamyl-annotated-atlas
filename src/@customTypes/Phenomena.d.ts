export interface Phenomena {
  value: string;
  guiName: [
    {
      nb: string;
      nn: string;
      en: string;
    },
  ];
  severities: string[];
  thresholds: string[];
}
