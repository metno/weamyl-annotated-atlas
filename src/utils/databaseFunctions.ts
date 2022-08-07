const axios = require('axios');

async function getIncidentNames() {
  try {
    const response = await axios.get(
      'https://test.metcap.met.no/api/v1/cap/incident/name/list/',
    );
    if (response.status === 200) {
      console.log('success stuff');
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
  // return await response.data;
}

async function getWarningsFromIncidentNames(names: any) {
  //const testResponse = 'Hello World!!';
  const url = `https://test.metcap.met.no/api/v1/cap/incident/${names}`;
  const response = await axios.get(url);
  console.log(response);
  return response;
}

export default {
  getIncidentNames,
  getWarningsFromIncidentNames,
};
