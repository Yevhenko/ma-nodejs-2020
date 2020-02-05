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
    console.log('Limit:', data);
  } catch (error) {
    console.log(error);
  }
}

async function mainMetrics() {
  try {
    const data = await request(optionsMetrics);
    console.log('Metrics:', data);
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

    for (let count = 1; count < 30; count += 1) {
      setTimeout(() => {
        mainPoint();
      }, 100 * 2 ** count);
      break;
    }
  }
}

module.exports = function rpn() {
  setInterval(() => {
    mainPoint();
    mainLimit();
    mainMetrics();
  }, 5000);
};
