const axios = require('axios');

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
    console.log(res.data);
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
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

setInterval(() => {
  mainL();
  mainM();
}, 5000);
