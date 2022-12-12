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

var xTest =
  '<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>\n' +
  '<csw:GetRecords\n' +
  '    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"\n' +
  '    xmlns:gml="http://www.opengis.net/gml"\n' +
  '    xmlns:ogc="http://www.opengis.net/ogc"\n' +
  '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n' +
  '    service="CSW"\n' +
  '    version="2.0.2"\n' +
  '    resultType="results"\n' +
  '    maxRecords="10"\n' +
  '    outputFormat="application/xml"\n' +
  '    outputSchema="http://www.opengis.net/cat/csw/2.0.2"\n' +
  '    xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd" >\n' +
  '  <csw:Query typeNames="csw:Record">\n' +
  '    <csw:ElementSetName>full</csw:ElementSetName>\n' +
  '    <csw:Constraint version="1.1.0">\n' +
  '      <ogc:Filter>\n' +
  '        <ogc:Intersects>\n' +
  '          <ogc:PropertyName>ows:BoundingBox</ogc:PropertyName>\n' +
  '          <gml:Polygon>\n' +
  '            <gml:exterior>\n' +
  '              <gml:LinearRing>\n' +
  '                <gml:posList>\n' +
  '                  62.0896 8.56313 60.4449 6.00234 60.128 10.2408 62.0896 8.56313\n' +
  '                </gml:posList>\n' +
  '              </gml:LinearRing>\n' +
  '            </gml:exterior>\n' +
  '          </gml:Polygon>\n' +
  '        </ogc:Intersects>\n' +
  '      </ogc:Filter>\n' +
  '    </csw:Constraint>\n' +
  '  </csw:Query>\n' +
  '</csw:GetRecords>';

async function getModelData() {
  const url = `/`;
  const response = await modelDAtaClient.post(url, xTest);
  console.log('SENDASearch: ', response);
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
