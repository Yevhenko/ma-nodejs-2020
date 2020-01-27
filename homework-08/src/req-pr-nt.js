const request = require('request-promise-native');

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

setInterval(() => {
  mainL();
  mainM();
}, 5000);
