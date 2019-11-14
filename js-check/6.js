const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 0];
const third = [];
for (let i = 0; i < first.length; i += 1) {
  // second.length стільки ж елементів, як і first.length
  third.push(second[i], first[i]);
}
third.reverse();
console.log(third);
