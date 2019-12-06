function randomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

function throwDice() {
  return Promise.resolve(randomInteger(6));
}

setTimeout(() => {
  throwDice().then((dice1) => {
    console.log(`The first dice is ${dice1}`);

    setTimeout(() => {
      throwDice().then((dice2) => {
        console.log(`The second dice is ${dice2}`);

        setTimeout(() => {
          console.log(`The sum of dices is ${dice1 + dice2}`);
        }, 3000);
      });
    }, 2000);
  });
}, 700);
