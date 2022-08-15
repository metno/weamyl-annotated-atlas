const axios = require('axios');

const client = axios.create({
  baseURL: 'https://test.metcap.met.no/api/v1/cap',
});

async function getIncidentNamesList() {
  const url = `/incident/name/list/`;
  const response = await client.get(url);
  console.log(response.data);
  return response;
}

async function getWarningsFromIncidentNames(names: string) {
  const url = `/incident/${names}`;
  const response = await client.get(url);
  console.log(response.data[0]._id);
  return response;
}

export default {
  getIncidentNamesList,
  getWarningsFromIncidentNames,
};
