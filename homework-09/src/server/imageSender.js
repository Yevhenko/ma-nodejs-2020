/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const { pipeline, Transform } = require('stream');
const config = require('../config');

class Trans extends Transform {
  constructor() {
    super();
    this.length = 0;
  }

  _transform(chunk, encoding, next) {
    if (this.length === 1048576) {
      process.stdout.write('.');
      this.length = 0;
    }
    this.length += chunk.length;

    setTimeout(() => {
      this.push(chunk);
      next();
    }, (chunk.length / config.rate) * 1000);
  }
}

function sendJPEG(response) {
  const limiter = new Trans();

  const rs = fs.createReadStream(config.filePath);

  pipeline(rs, limiter, response, err => {
    if (err) {
      console.error('Failed to send image buffer!', err.stack);
      return;
    }
    console.log('The image has been downloaded');
  });
}

module.exports = {
  sendJPEG,
};
