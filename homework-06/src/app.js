const os = require('os');

const RATE = process.env.RATE || 1000;
const LIMIT = process.env.LIMIT || 300;
const COLOR = process.env.COLOR || true;

let prevUsedMemory = 0;
function curUsedMem() {
  const totalMem = os.totalmem() / 1048576;
  const freeMem = os.freemem() / 1048576;
  const usedMem = totalMem - freeMem;
  const delta = usedMem - prevUsedMemory;
  prevUsedMemory = usedMem;
  if (COLOR === 'false') {
    console.log(`Total system memory: ${totalMem.toFixed(3)}`);
    console.log(`Free memory available: ${freeMem.toFixed(3)}`);
    console.log(`Allocated memory: ${usedMem.toFixed(3)}`);
    console.log(`Delta for previous allocated memory value: ${delta.toFixed(3)}`);
    if (freeMem < LIMIT)
      console.log('!!! ATTENTION: Available memory is under the defined limit !!!');
  } else {
    console.log(`Total system memory: ${totalMem.toFixed(3)}`);
    if (freeMem < LIMIT)
      console.log(`Free memory available: \x1b[31m%s\x1b[0m`, `${freeMem.toFixed(3)}`);
    else {
      console.log(`Free memory available: ${freeMem.toFixed(3)}`);
    }
    console.log(`Allocated memory: ${usedMem.toFixed(3)}`);
    if (delta >= 0)
      console.log(
        `Delta for previous allocated memory value: \x1b[32m%s\x1b[0m`,
        `${delta.toFixed(3)}`,
      );
    else {
      console.log(
        `Delta for previous allocated memory value: \x1b[31m%s\x1b[0m`,
        `${delta.toFixed(3)}`,
      );
    }
    if (freeMem < LIMIT)
      console.log(
        '\x1b[31m%s\x1b[0m',
        '!!! ATTENTION: Available memory is under the defined limit !!!',
      );
  }
}

setInterval(() => {
  console.clear();
  curUsedMem();
}, RATE);
