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
  uri: 'http://localhost:3000/limit',
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

async function mainLimit() {
  try {
    const data = await request.post(optionsLimit);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function mainMetrics() {
  try {
    const data = await request(optionsMetrics);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function mainPoint() {
  try {
    const data = await request(optionsPoint);
    console.log('POINT RESP:', data);
  } catch (error) {
    console.error('mainPoint error:', error.message);
    mainPoint();
  }
}

module.exports = function rpn() {
  setInterval(() => {
    mainPoint();
    mainLimit();
    mainMetrics();
  }, 5000);
};
