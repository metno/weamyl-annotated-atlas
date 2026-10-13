import axios, { AxiosError } from 'axios';
import { apiConfig } from './apiConfig';

// change this in the .env-file to use another backend/SENDA-setup
let url = apiConfig.baseCapUrl;
let mapURL = apiConfig.baseMapUrl;
let evaluationURL = apiConfig.baseEvaluationUrl;
let cswURL = apiConfig.sendaUrl;

const client = axios.create({
  baseURL: url,
});

const mapClient = axios.create({
  baseURL: mapURL,
});

const evaluationsClient = axios.create({
  baseURL: evaluationURL,
});

const modelDAtaClient = axios.create({
  baseURL: cswURL,
});

async function getCapAttachmentXML(id: string) {
  const url = `/xml/${id}`;
  try {
    const response = await client.get(url);
    // console.log('Attachment ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching CapAttachmentXML:', error);
    // Handle the error appropriately based on your application's needs.
    // For example, you could rethrow the error, return a default value, or return null.
    throw error; // Rethrow the error to be handled by the caller.
  }
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

async function getCountyList() {
  const url = `/fylke/list/`;
  const response = await mapClient.get(url);
  // console.log('Fylkesliste: ', response.data);
  return response;
}

async function getlowresCountyPolygon(county_id: string) {
  const url = `/fylke/administrativeId/${county_id}`;
  const response = await mapClient.get(url);
  return response;
}

async function getPhenomenaList() {
  const url = `/phenomenon/list/`;
  const response = await client.get(url);
  //console.log('FenomenListe: ', response.data);
  return response;
}

async function getColourList() {
  const url = `/colour/list/`;
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
  const url = `/search/full/`;
  const eval_url = `/list`;

  try {
    const search_result = await client.post(url, input, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const eval_list = await evaluationsClient.get(eval_url);
    const evaluationIds = new Set(eval_list.data.map((id: string) => id));

    // marking annoted incidents
    const updatedSearchResults = search_result.data.matching_warnings.map(
      (result: any) => ({
        ...result,
        annotated: evaluationIds.has(result._id), // Mark as annotated if `_id` exists in evaluationList
      }),
    );

    return updatedSearchResults;
  } catch (error) {
    console.error('Error fetching evaluation List:', error);
    // Handle the error appropriately based on your application's needs.
    // For example, you could rethrow the error, return a default value, or return null.
    throw error; // Rethrow the error to be handled by the caller.
  }
}

function createSendaSearchRequest(
  sendaPolygon: string,
  startTime: string,
  endTime: string,
) {
  const escapeXml = (value: string) =>
    value.replace(
      /[<>&'"]/g,
      (character) =>
        ({
          '<': '&lt;',
          '>': '&gt;',
          '&': '&amp;',
          "'": '&apos;',
          '"': '&quot;',
        })[character] ?? character,
    );

  return `<?xml version="1.0" encoding="UTF-8"?>
<csw:GetRecords
    xmlns:csw="http://www.opengis.net/cat/csw/2.0.2"
    xmlns:gml="http://www.opengis.net/gml"
    xmlns:ogc="http://www.opengis.net/ogc"
    xmlns:ows="http://www.opengis.net/ows"
    xmlns:apiso="http://www.opengis.net/cat/csw/apiso/1.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    service="CSW"
    version="2.0.2"
    resultType="results"
    maxRecords="100"
    outputFormat="application/xml"
    outputSchema="http://www.opengis.net/cat/csw/2.0.2"
    xsi:schemaLocation="http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd">
  <csw:Query typeNames="csw:Record">
    <csw:ElementSetName>summary</csw:ElementSetName>
    <csw:Constraint version="1.1.0">
      <ogc:Filter>
        <ogc:And>
          <ogc:Intersects>
            <ogc:PropertyName>ows:BoundingBox</ogc:PropertyName>
            <gml:Polygon>
              <gml:exterior>
                <gml:LinearRing>
                  <gml:posList>${escapeXml(sendaPolygon)}</gml:posList>
                </gml:LinearRing>
              </gml:exterior>
            </gml:Polygon>
          </ogc:Intersects>
          <ogc:PropertyIsLessThanOrEqualTo>
            <ogc:PropertyName>apiso:TempExtent_begin</ogc:PropertyName>
            <ogc:Literal>${escapeXml(endTime)}</ogc:Literal>
          </ogc:PropertyIsLessThanOrEqualTo>
          <ogc:PropertyIsGreaterThanOrEqualTo>
            <ogc:PropertyName>apiso:TempExtent_end</ogc:PropertyName>
            <ogc:Literal>${escapeXml(startTime)}</ogc:Literal>
          </ogc:PropertyIsGreaterThanOrEqualTo>
        </ogc:And>
      </ogc:Filter>
    </csw:Constraint>
  </csw:Query>
</csw:GetRecords>`;
}

async function getModelData(
  polygon: string,
  startTime: string,
  endTime: string,
) {
  const requestXml = createSendaSearchRequest(polygon, startTime, endTime);
  const requestUrl = '/';
  const requestHeaders = {
    'Content-Type': 'application/xml; charset=UTF-8',
  };
  console.log('Senda request:', {
    method: 'POST',
    url: modelDAtaClient.getUri({ url: requestUrl }),
    headers: requestHeaders,
    body: requestXml,
  });
  const response = await modelDAtaClient.post(requestUrl, requestXml, {
    headers: requestHeaders,
  });
  console.log('Senda response:', {
    status: response.status,
    headers: response.headers,
    body: response.data,
  });
  return response.data;
}

async function getEvaluationForm(cap_id: string) {
  const url = `/id/${cap_id}`;
  try {
    const response = await evaluationsClient.get(url);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError; // Explicitly cast error
    console.log('axiosError.response', axiosError.response);
    if (axiosError.response?.status === 404) {
      console.warn('Evaluation form not found for ID:', { cap_id });
      return null;
    }
    console.error('Error fetching evaluation form:', error);

    // Handle the error appropriately based on your application's needs.
    // For example, you could rethrow the error, return a default value, or return null.
    throw error; // Rethrow the error to be handled by the caller.
  }
}

async function putEvaluationForm(evaluationObject: object) {
  console.log('OBJECT: ', evaluationObject);
  const url = `/document/`;
  const response = await evaluationsClient.put(url, evaluationObject);
  return response.data;
}

export default {
  getCapAttachmentXML,
  getCapFiles,
  getIncidentNamesList,
  getCountyList,
  getlowresCountyPolygon,
  getPhenomenaList,
  getColourList,
  getCustomAreaList,
  getWarningsFromIncidentNames,
  getOpenSearch,
  getModelData,
  getEvaluationForm,
  putEvaluationForm,
};
