const data = '21345A67098';
let number = 0;
let result = '';

for (let i = 0; i < data.length; i += 1) {
  number = data[i] % 2;
  if (number === 0 && data[i] > 0) {
    result += data[i];
  }
}

console.log(result);
