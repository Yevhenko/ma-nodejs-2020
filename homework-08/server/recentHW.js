const os = require('os');

function curUsedMem(limit) {
  const response = {
    total: (os.totalmem() / 1048576).toFixed(3),
    free: (os.freemem() / 1048576).toFixed(3),
    allocated: ((os.totalmem() - os.freemem()) / 1048576).toFixed(3),
  };

  if (response.free < limit) {
    response.message = 'Available memory is under the defined limit';
  }
  return response;
}

module.exports = curUsedMem;