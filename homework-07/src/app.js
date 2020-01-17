const http = require('http');

const requestHandler = require('./requestHandler');

http.createServer(requestHandler.handle).listen(3000, () => {
  console.log('Server is started');
});
