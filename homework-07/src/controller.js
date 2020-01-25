const HW = require('./recentHW');

const token = process.env.TOKEN;

async function getMetricsWithFilter(req, res) {
  try {
    const {
      headers: { authorization },
    } = req;
    const {
      queryParams: { filter },
    } = req;

    if (authorization !== `Basic ${token}`) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Unauthorized',
        }),
      );
    }

    if (filter) {
      if (filter === 'total') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            total: `${HW().total}`,
            message: 'OK',
          }),
        );
      }

      if (filter === 'free') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            free: `${HW().free}`,
            message: 'OK',
          }),
        );
      }

      if (filter === 'allocated') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            allocated: `${HW().allocated}`,
            message: 'OK',
          }),
        );
      }

      return res.end(JSON.stringify({ message: 'Filter value is not valid' }));
    }

    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        message: 'Filter value is not valid',
      }),
    );
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(
      JSON.stringify({
        message: 'Internal error occured',
      }),
    );
  }
}

async function getMetrics(req, res) {
  try {
    const {
      headers: { authorization },
    } = req;

    if (authorization !== `Basic ${token}`) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(
        JSON.stringify({
          message: 'Unauthorized',
        }),
      );
    }

    const memoryStatus = HW();

    memoryStatus.message = 'OK';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(memoryStatus));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.endJSON.stringify({
      message: 'Internal error occured',
    });
  }
}

async function checkLimit(req, res) {
  try {
    const { body } = req;
    const { limit } = body;
    const {
      headers: { authorization },
    } = req;

    if (authorization !== 'Basic WWV2aGVuOjEyMzQ1') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Unauthorized',
        }),
      );
    }

    if (typeof limit === 'number' && limit > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: `Minimum free memory limit is successfully set to ${limit} MB`,
        }),
      );
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'New value for minimum free memory limit is not valid number',
        }),
      );
    }
  } catch (error) {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'Internal error occured',
        }),
      );
    }
  }
}

module.exports = { checkLimit, getMetrics, getMetricsWithFilter };
