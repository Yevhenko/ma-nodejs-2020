function randomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

function throwDice(callback) {
  return callback(null, randomInteger(6));
}

setTimeout(() => {
  throwDice((err, dice1) => {
    if (err) throw new Error();

    console.log(`The first dice is ${dice1}`);

    setTimeout(() => {
      throwDice((error, dice2) => {
        if (error) throw new Error();

        console.log(`The second dice is ${dice2}`);

        setTimeout(() => {
          console.log(`The sum of dices is ${dice1 + dice2}`);
        }, 3000);
      });
    }, 2000);
  });
}, 700);
