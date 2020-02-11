const cli = require('vorpal')();

const httpClient = require('./httpClient');

const requestPromiseNative = require('./requestPromiseNative');
const axios = require('./axios');

console.clear();
console.log('Make your choice of the client');

cli.command('httpClient', 'Outputs "httpClient"').action(() => {
  console.log('You have chosen httpClient');
  httpClient();
});

cli.command('requestPromiseNative', 'Outputs "requestPromiseNative"').action(() => {
  console.log('You have chosen requestPromiseNative');
  requestPromiseNative();
});

cli.command('axios', 'Outputs "axios"').action(() => {
  console.log('You have chosen axios');
  axios();
});

cli.delimiter('$').show();
