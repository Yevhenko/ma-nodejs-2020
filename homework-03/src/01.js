let prime = 1;

// eslint-disable-next-line consistent-return
function getNextPrime(currentPrime) {
  let pr = currentPrime + 1;
  while (pr) {
    let isPrime = true;
    for (let num = 2; num < pr; num += 1) {
      if (pr % num === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime === true) return pr;
    pr += 1;
  }
}
setInterval(() => {
  console.log(`${Date.now()}: -- IN PROCESS -- Biggest prime number found: ${prime}`);
}, 1000);

setInterval(() => {
  prime = getNextPrime(prime);
  console.log(prime);
}, 5);
