const axios = require('axios');
let url = `${process.env.REACT_APP_BASEURL}`;

const client = axios.create({
  baseURL: url,
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
  //console.log('FenomenListe: ', response.data);
  return response;
}

async function getColourList() {
  const url = `/color/list/`;
  const response = await client.get(url);
  //console.log('FargeListe: ', response.data);
  return response;
}

async function getCustomAreaList() {
  const url = `/customArea/list/`;
  const response = await client.get(url);
  //console.log('Predefinert område: ', response.data);
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
  //console.log('OpenSearch: ', response);
  return response;
}

export default {
  getIncidentNamesList,
  getPhenomenaList,
  getColourList,
  getCustomAreaList,
  getWarningsFromIncidentNames,
  getOpenSearch,
};
