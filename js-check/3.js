let text = 'Hello World!';
let pos = 0;
do {
  pos = text.indexOf('o', pos + 1);
  if (pos !== -1) {
    console.log(pos + 1);
  }
} while (pos !== -1);

text = text.split('l').join('');

console.log(text);
