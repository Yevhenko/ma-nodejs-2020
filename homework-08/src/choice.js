const cli = require('vorpal')();

const httpCL = require('./httpClient');
const rpn = require('./req-pr-nt');
const ax = require('./axios');

console.clear();
console.log('Make your choice of the client');

cli.command('http', 'Outputs "httpClient"').action(() => {
  console.log('You have chosen http-client');
  httpCL();
});

cli.command('rpn', 'Outputs "req-pr-nt"').action(() => {
  console.log('You have chosen rpn-client');
  rpn();
});

cli.command('axios', 'Outputs "axios"').action(() => {
  console.log('You have chosen axios');
  ax();
});

cli.delimiter('$').show();
