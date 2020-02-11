const axios = require('axios');
const axiosRetry = require('axios-retry');

axiosRetry(axios, {
  retries: 30,
  retryDelay: (retryCount) => {
    return retryCount * 100;
  },
});

async function mainM() {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/metrics?filter=total',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic WWV2aGVuOjEyMzQ1',
      },
    });

    console.log('Metrics:', res.data);
  } catch (error) {
    console.log(error);
  }
}

async function mainL() {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3000/limit',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic WWV2aGVuOjEyMzQ1',
      },
      data: { limit: 500 },
    });

    console.log('Limit:', response.data);
  } catch (error) {
    console.log(error);
  }
}

async function mainP() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3000/anyEndpoint',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic WWV2aGVuOjEyMzQ1',
      },
    });

    console.log('Point:', response.status, response.data);
  } catch (error) {
    console.error('mainPoint error:', error.message);
  }
}

module.exports = function ax() {
  setInterval(() => {
    mainP();
    mainL();
    mainM();
  }, 5000);
};
