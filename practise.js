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

const euroToUSD = 1.1;
// PIPELINE
const totalDepositsUSD = movements.filter(mov => mov >0).map(mov => mov * euroToUSD).reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);