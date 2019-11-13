/* eslint-disable default-case */
const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

switch (true) {
  case vegetables.includes('cucumber'):
    console.log('vegetables');
    break;
  case fruits.includes('cucmber'):
    console.log('fruits');
    break;
}
