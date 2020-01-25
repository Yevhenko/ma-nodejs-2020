const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/limit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
  body: JSON.stringify({ limit: Number('500') }),
};

const postData = options.body;

function httpRequest() {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');

      let rawData = '';

      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        res.data = rawData;
        resolve(res);
      });
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    const data = await httpRequest(options);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

main();
