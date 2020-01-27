const querystring = require('querystring');
const url = require('url');

const router = require('./router');

async function handle(req, res) {
  try {
    const { url: uri } = req;
    const parsedUrl = url.parse(uri);
    const queryParams = querystring.decode(parsedUrl.query);
    let body = [];

    req
      .on('error', (err) => {
        console.log(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        try {
          if (body.length) {
            body = Buffer.concat(body).toString();
          }
          router(
            {
              ...req,
              body: body.length ? JSON.parse(body) : {},
              url: parsedUrl,
              queryParams,
            },
            res,
          );
        } catch (error) {
          console.log(error);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { handle };