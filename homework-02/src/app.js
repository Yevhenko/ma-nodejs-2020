const { task1: mod1, task2: mod2, task3 } = require('./task');

const boot = async () => {
  console.log(mod1);
  console.log(await task3);
  console.log(mod2);
};

boot();
