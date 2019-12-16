/* eslint-disable no-unused-expressions */
function randomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}
async function throwDice(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomInteger(6));
    }, time);
  });
}
async function dicesAndSum() {
  let sum = 0;
  const dice1 = await throwDice(700);
  console.log(`The first dice is ${dice1}`);
  sum += dice1;
  const dice2 = await throwDice(2000);
  console.log(`The second dice is ${dice2}`);
  sum += dice2;
  setTimeout(() => {
    console.log(`The sum of dices is ${sum}`);
  }, 3000);
}
dicesAndSum();
