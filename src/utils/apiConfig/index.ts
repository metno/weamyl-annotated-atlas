const baseCapUrl = process.env.REACT_APP_BASE_CAP_URL || '';
const baseMapUrl = process.env.REACT_APP_BASE_MAP_URL || '';
const baseEvaluationUrl = process.env.REACT_APP_BASE_EVALUATION_URL || '';
const sendaUrl = process.env.REACT_APP_SENDA_URL || '';

const evaluationExportUrl =
  process.env.REACT_APP_EVALUATION_EXPORT_URL ||
  (baseEvaluationUrl ? `${baseEvaluationUrl}/export` : '');

export const apiConfig = {
  baseCapUrl,
  baseMapUrl,
  baseEvaluationUrl,
  evaluationExportUrl,
  sendaUrl,
};
