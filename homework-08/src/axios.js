const axios = require('axios');

async function main() {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:3000/metrics?filter=total',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic WWV2aGVuOjEyMzQ1',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

main();
