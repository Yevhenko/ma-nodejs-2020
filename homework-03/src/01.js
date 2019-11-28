let prime = 2;

// eslint-disable-next-line consistent-return
function getNextPrime(x) {
  let num = x;

  while (num) {
    for (let div = 1; div < num; div += 1) {
      // eslint-disable-next-line no-continue
      if (num % div !== 0) continue;
      num += 1;
    }

    return num;
  }
}

setInterval(() => {
  console.log(`${Date.now()}: -- IN PROCESS -- Biggest prime number found: ${prime}`);
}, 1000);

setInterval(() => {
  prime = getNextPrime(prime);
  console.log(prime);
}, 50);
