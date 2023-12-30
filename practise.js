// Coding Challenge - 1
// -------------- TEST DATA - 1 ---------------
const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

// -------------- TEST DATA - 2 ---------------
const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 8, 4];

function checkDogs(dogsJulia, dogsKate){
  const newJulia = dogsJulia.slice(1, dogsJulia.length - 2);
  
  newJulia.concat(dogsKate).forEach((dogs, i) => {
    const type = (dogs < 3)? "puppy" : "adult";
    console.log(`Dog number ${i + 1} is a ${type}, and is ${dogs} years old`);
  });
};
// checkDogs(julia, kate);
// checkDogs(julia2, kate2);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Convert the existing callback function into an array function
// const movementtoUSD = movements.map(movement =>  movement * 1.1);

// const withdrawals = movements.filter(movement => movement < 0);

// REDUCE method
// accumulator -> SNOWBALL
const balance = movements.reduce(function(acc, curr, i, arr){
  // console.log(`Iteration ${i} : ${acc}`);
  // return acc + curr;
}, 0);
// console.log(balance);

// Maximum value using reduce 
// const maxValue = movements.reduce((acc, curr, i) => {
//   let max = movements[0];
//   if(movements[i] > max)
//     max = movements[i];
//   return max;
// });

// console.log(maxValue);

// const maxValue = movements.reduce((acc, mov) => {
//   if(acc > mov)
//   return acc;
//   else
//   return mov;
// }, movements[0]);
const euroToUSD = 1.1;
// PIPELINE
const totalDepositsUSD = movements.filter(mov => mov >0).map(mov => mov * euroToUSD).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// ------------- TEST DATA - 1 --------------
// [5, 2, 4, 1, 15, 8, 3]
const calculateAverageHumanAge = function(ages){
  const humanAges = ages.map(age => age <=2 ? 2 * age : 16 + age * 4);
  const adults = humanAges.filter(age => {
    return age >= 18;
  });
  const average = adults.reduce((acc, curr) => {
    return acc + curr;
  }, 0)/adults.length;

  // const average = adults.reduce((acc, curr, i, arr) =>  acc + curr / arr.length, 0);

  return average;
}

const avg1 = calculateAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calculateAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// Rewrite the calcAverageHuman function from the previous challenge using arrow function and also using chaining

const calcAverageHuman = (ages) => ages.map(age => age <=2 ? 2 * age : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0);


// console.log(calcAverageHuman([5, 2, 4, 1, 15, 8, 3]));

// By using find method, we can retrieve one element from an array based on a condition

const withdrawal = movements.find(mov => mov < 0);
// It will not return a new array but it will return the first element which satisfies the condition 

console.log(movements);
console.log(withdrawal); 

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);