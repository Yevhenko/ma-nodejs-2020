const HW = require('./recentHW');

const result3 = {
  message: 'Internal error occured',
};
const result1 = {
  message: 'New value for minimum free memory limit is not valid number',
};
const result2 = {
  message: 'Unauthorized',
};
const result5 = {
  message: 'Filter value is not valid',
};
const result6 = {
  total: `${HW().total}`,
  message: 'OK',
};
const result7 = {
  free: `${HW().free}`,
  message: 'OK',
};
const result8 = {
  allocated: `${HW().allocated}`,
  message: 'OK',
};

async function getMetricsWithFilter(req, res) {
  try {
    const {
      queryParams: { filter },
    } = req;

    if (filter) {
      if (['total', 'free', 'allocated'].includes(filter)) {
        if (filter === 'total') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result6));
        } else if (filter === 'free') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result7));
        } else if (filter === 'allocated') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result8));
        }
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result5));
    }
  } catch (error) {
    if (res.toString().includes(error)) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result3));
    }
  }
}

async function getMetrics(req, res) {
  try {
    const {
      headers: { authorization },
    } = req;

    const result = HW();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result, (result.message = 'OK')));

    if (authorization !== 'Basic WWV2aGVuOjEyMzQ1') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result2));
    }
  } catch (error) {
    if (res.toString().includes(error)) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result3));
    }
  }
}

async function getLimit(req, res) {
  try {
    const { body } = req;
    const { limit } = body;
    const {
      headers: { authorization },
    } = req;
    const result4 = {
      message: `Minimum free memory limit is successfully set to ${limit} MB`,
    };

    if (authorization !== 'Basic WWV2aGVuOjEyMzQ1') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result2));
    }

    if (typeof limit === 'number' && limit > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result4));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result1));
    }
  } catch (error) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result3));
    }
  }
}

module.exports = { getLimit, getMetrics, getMetricsWithFilter };
