function randomInteger(max) {
  return Math.floor(Math.random() * max);
}

async function throwDice(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

let sum = 0;

Promise.resolve()
  .then(() => throwDice(700).then(() => randomInteger(6)))
  .then((dice1) => {
    if (dice1 === 0) throw new Error('Lost dice');
    console.log(`The first dice is ${dice1}`);
    sum += dice1;
  })
  .then(() => throwDice(2000).then(() => randomInteger(6)))
  .then((dice2) => {
    if (dice2 === 0) throw new Error('Lost dice');
    console.log(`The second dice is ${dice2}`);
    sum += dice2;
  });
setTimeout(() => {
  console.log(`The sum of dices is ${sum}`);
}, 3000);
