const http = require('http');

let count = 0;

const optionsLimit = {
  hostname: 'localhost',
  port: 3000,
  path: '/limit?',
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic WWV2aGVuOjEyMzQ1',
  },
  body: JSON.stringify({ limit: 500 }),
};

// eslint-disable-next-line no-shadow
function httpRequestLimit(optionsLimit) {
  return new Promise((resolve, reject) => {
    const req = http.request(optionsLimit, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      if (res.statusCode !== 200) {
        count += 1;

        setTimeout(() => {
          httpRequestLimit(optionsLimit, count);
        }, 100 * 2 ** count);

        if (count > 5) console.log('ERROR!!!');
      }

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

    req.write(optionsLimit.body);
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
function httpRequestMetrics(optionsMetrics) {
  return new Promise((resolve, reject) => {
    const req = http.request(optionsMetrics, (res) => {
      console.log(`STATUS: ${res.statusCode}`);

      if (res.statusCode !== 200) {
        count += 1;

        setTimeout(() => {
          httpRequestMetrics(optionsMetrics, count);
        }, 100 * 2 ** count);

        if (count > 5) console.log('ERROR!!!');
      }

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
function httpRequestPoint(optionsPoint) {
  return new Promise((resolve, reject) => {
    const req = http.request(optionsPoint, (res) => {
      console.log(`STATUS: ${res.statusCode}`);

      if (res.statusCode !== 200) {
        count += 1;

        setTimeout(() => {
          httpRequestPoint(optionsPoint, count);
        }, 100 * 2 ** count);

        if (count > 5) console.log('ERROR!!!');
      }

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

module.exports = function httpCL() {
  setInterval(() => {
    httpRequestPoint(optionsPoint).then((res) =>
      console.log('POINT\n', JSON.parse(res.data), '\n'),
    );
    httpRequestMetrics(optionsMetrics).then((res) =>
      console.log('METRICS: \n', JSON.parse(res.data), '\n'),
    );
    httpRequestLimit(optionsLimit).then((res) =>
      console.log('LIMIT\n', JSON.parse(res.data), '\n'),
    );
  }, 5000);
};
