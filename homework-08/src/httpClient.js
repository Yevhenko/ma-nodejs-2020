const http = require('http');

const optionsLimit = {
  hostname: 'localhost',
  port: 3000,
  path: '/limit?',
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
  body: JSON.stringify({ limit: Number('500') }),
};

const postData = optionsLimit.body;

// eslint-disable-next-line no-shadow
function httpRequestL(optionsLimit) {
  return new Promise((resolve, reject) => {
    const req = http.request(optionsLimit, (res) => {
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

const optionsMetrics = {
  hostname: 'localhost',
  port: 3000,
  path: '/metrics?filter=free',
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
};

// eslint-disable-next-line no-shadow
function httpRequestM(optionsMetrics) {
  return new Promise((resolve, reject) => {
    const req = http.request(optionsMetrics, (res) => {
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

    req.end();
  });
}

const optionsPoint = {
  hostname: 'localhost',
  port: 3000,
  path: '/anyEndpoint?',
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
};

// eslint-disable-next-line no-shadow
function httpRequestP(optionsPoint) {
  return new Promise((resolve, reject) => {
    const req = http.request(optionsPoint, (res) => {
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

    req.end();
  });
}

setInterval(() => {
  httpRequestP(optionsPoint).then((res) => console.log('\nPOINT\n', res.data));
  httpRequestM(optionsMetrics).then((res) => console.log('\nMETRICS\n', res.data));
  httpRequestL(optionsLimit).then((res) => console.log('\nLIMIT\n', res.data));
}, 5000);
