const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');
let url = require('url');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName);
const outputFile = path.join(outputDirName, outputFileName);

async function getInputFileList() {
  try {
    const files = await fsp.readdir(inputDir);
    return files.map((file) => path.join(inputDir, file));
  } catch (err) {
    return err;
  }
}

async function getObjectFromFile(filePath) {
  try {
    const compressedBuffer = await fsp.readFile(filePath);
    const jsonBuffer = await gunzip(compressedBuffer);
    const json = jsonBuffer.toString();
    const object = JSON.parse(json);
    return object;
  } catch (err) {
    return err;
  }
}

function rebuildUrl(originalUrl) {
  url = new URL(originalUrl);

  const { name, ext } = path.parse(url.pathname);

  url.protocol = 'https';
  url.searchParams.set('file', name);
  url.searchParams.append('type', ext);
  url.pathname = '/devices';

  return url;
}

async function buildOutputObject(files) {
  const result = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const object = await getObjectFromFile(file);
    object.url = rebuildUrl(object.url);
    const name = path.basename(file.toLowerCase(), 'json.gz');
    result[name] = object;
  }
  return result;
}

async function saveOutput(object) {
  const buffer = Buffer.from(JSON.stringify(object));
  const gzipFile = await gzip(buffer);
  await fsp.writeFile(outputFile, gzipFile);
}

async function start() {
  const inputFiles = await getInputFileList();
  const outputObject = await buildOutputObject(inputFiles);
  await saveOutput(outputObject);
}

start()
  .then(() => {
    console.log('File is being created');
  })
  .catch((err) => {
    console.error(err);
  });
