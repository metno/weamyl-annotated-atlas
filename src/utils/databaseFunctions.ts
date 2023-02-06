import post_query from '../config/post_query.xml'
const axios = require('axios');

// change this in the .env-file to use another backend/SENDA-setup
let url = `${process.env.REACT_APP_BASEURL}`;
let cswURL = `${process.env.REACT_APP_SENDA_URL}`;

const client = axios.create({
  baseURL: url,
});

const modelDAtaClient = axios.create({
  baseURL: cswURL,
});

async function getCapAttachmentXML(id: string) {
  const url = `/xml/${id}`;
  const response = await client.get(url);
  // console.log('Attachment ', response.data);
  return response.data;
}

async function getCapAttachmentJSON(id: string) {
  const url = `/json/${id}`;
  const response = await client.get(url);
  // console.log('Attachment ', response.data);
  return response.data;
}

async function getCapFiles(cap: string) {
  const url = `/incident/${cap}`;
  const response = await client.get(url);
  console.log(response.data);
  return response;
}

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

async function getModelData() {
  const url = `/`;
  const response = await modelDAtaClient.post(url, post_query);
  // console.log('SENDASearch: ', response);
  return response;
}

export default {
  getCapAttachmentXML,
  getCapAttachmentJSON,
  getCapFiles,
  getIncidentNamesList,
  getPhenomenaList,
  getColourList,
  getCustomAreaList,
  getWarningsFromIncidentNames,
  getOpenSearch,
  getModelData,
};
