const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

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
    return console.error(err);
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
    return console.error(err);
  }
}

function rebuildUrl(originalUrl) {
  const newUrl = new URL(originalUrl);

  const { name, ext } = path.parse(newUrl.pathname);

  newUrl.protocol = 'https';
  newUrl.searchParams.set('file', name);
  newUrl.searchParams.append('type', ext);
  newUrl.pathname = '/devices';

  return newUrl;
}

async function buildOutputObject(files) {
  try {
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
  } catch (error) {
    return console.error(error);
  }
}

async function saveOutput(object) {
  try {
    const buffer = Buffer.from(JSON.stringify(object));
    const gzipFile = await gzip(buffer);
    await fsp.writeFile(outputFile, gzipFile);
  } catch (error) {
    console.error(error);
  }
}

async function start() {
  try {
    const inputFiles = await getInputFileList();
    const outputObject = await buildOutputObject(inputFiles);
    await saveOutput(outputObject);
  } catch (error) {
    console.error(error);
  }
}

start()
  .then(() => {
    console.log('File is being created');
  })
  .catch((err) => {
    console.error(err);
  });
