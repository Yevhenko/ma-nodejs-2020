const request = require('request-promise-native');

const options = {
  method: 'GET',
  url: 'http://localhost:3000/metrics',
  headers: {
    'content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
    json: true,
  },
};

async function main() {
  try {
    const response = await request(options);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

main();
