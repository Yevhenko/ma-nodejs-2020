const controller = require('./controller');

function router(req, res) {
  const { url, method, queryParams } = req;
  const { filter } = queryParams;

  switch (url.pathname) {
    case '/metrics':
      if (method === 'GET' && !filter) controller.getMetrics(req, res);
      else if (method === 'GET' && filter) controller.getMetricsWithFilter(req, res);
      else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end('Not Found');
      }
      break;
    case '/limit':
      if (url.pathname === '/limit' && method === 'POST') controller.getLimit(req, res);
      else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end('Not Found');
      }
      break;

    default:
      break;
  }
}

module.exports = router;
