/* eslint-disable linebreak-style */
/* eslint-disable no-console */
function sayAnything(time) {
  return new Promise((res) => {
    setTimeout(() => res(), time);
  });
}

sayAnything(10000)
  .then(() => {
    console.log('HELLO MA');
  })
  .catch(() => {
    console.log('=(');
  });
