const request = require('request-promise-native');
require('request-promise-native-retry');

const optionsMetrics = {
  method: 'GET',
  url: 'http://localhost:3000/metrics?filter=total',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
  json: true,
};

const optionsLimit = {
  method: 'POST',
  url: 'http://localhost:3000/limit?',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
  body: { limit: 500 },
  json: true,
};

const optionsPoint = {
  method: 'GET',
  url: 'http://localhost:3000/anyEndpoint',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
  json: true,
};

async function mainL() {
  try {
    const data = await request(optionsLimit);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function mainM() {
  try {
    const data = await request(optionsMetrics);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function mainP() {
  try {
    const data = await request(optionsPoint);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {
  mainP();
  mainL();
  mainM();
}, 5000);
