const axios = require('axios');

const client = axios.create({
  baseURL: 'https://test.metcap.met.no/api/v1/cap',
});

async function getIncidentNamesList() {
  const url = `/incident/name/list/`;
  const response = await client.get(url);
  // console.log('Navneliste: ', response.data);
  return response;
}

async function getPhenomenaList() {
  const url = `/phenomenon/list/`;
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

async function getOpenSearch(input: object) {
  const url = `/`;
  const response = await client.post(url, input);
  console.log('OpenSearch: ', response);
  return response;
}

export default {
  getIncidentNamesList,
  getPhenomenaList,
  getWarningsFromIncidentNames,
  getOpenSearch,
};
