function randomInteger(max) {
  return Math.floor(Math.random() * max);
}

function throwDice(callback) {
  return callback(null, randomInteger(6));
}

setTimeout(() => {
  throwDice((err, dice1) => {
    if (dice1 === 0) throw new Error('Dice was lost!');

    console.log(`The first dice is ${dice1}`);

    setTimeout(() => {
      throwDice((error, dice2) => {
        if (dice2 === 0) throw new Error('Dice was lost!');

        console.log(`The second dice is ${dice2}`);

        setTimeout(() => {
          console.log(`The sum of dices is ${dice1 + dice2}`);
        }, 3000);
      });
    }, 2000);
  });
}, 700);
