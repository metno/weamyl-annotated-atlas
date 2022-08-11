const axios = require('axios');

const client = axios.create({
  baseURL: 'https://test.metcap.met.no/api/v1/cap',
});

/*async function getIncidentNames() {
  const response = await axios.get(
    'https://test.metcap.met.no/api/v1/map/lowres/kommune/list/',
  );
  return await response.data;
}*/

async function getWarningsFromIncidentNames(names: any) {
  const url = `/incident/${names}`;
  const response = await client.get(url);
  console.log(response.data[0]._id);
  return response;
}

export default {
  //getIncidentNames,
  getWarningsFromIncidentNames,
};
