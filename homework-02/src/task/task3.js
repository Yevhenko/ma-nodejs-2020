/* eslint-disable linebreak-style */
/* eslint-disable no-console */
function sayAnything(text, timer) {
  return new Promise((res) => {
    setTimeout(() => res(text), timer);
  });
}

module.exports = sayAnything('Hello MA', 1000);
