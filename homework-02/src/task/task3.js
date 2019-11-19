/* eslint-disable linebreak-style */
/* eslint-disable no-console */
function sayAnything(text, timer) {
  return new Promise((res) => {
    setTimeout(() => res(text), timer);
  });
}

sayAnything('Hello MA', 1000).then((text) => {
  console.log(text);
});

module.exports = sayAnything('Hello MA', 1000);
