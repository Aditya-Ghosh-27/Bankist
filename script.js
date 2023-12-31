'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


// ------------ CREATING DOM ELEMENTS(Manipulating the containerMovement) -----------------
const displayMovements = function(movements){
  containerMovements.innerHTML = '';

  movements.forEach((movement, index) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
      <div class="movements__value">${movement}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}
displayMovements(account1.movements);

// ------------ CALCULATING & DISPLAYING BALANCE ---------------
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${acc.balance} RUP`;
}

// The Magic of Chaining Methods
// ---------------- CALCULATING THE SUMMARY --------------------

const calcDisplaySummary = function(acc){
  const incomes = acc.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} RUP`;

  const out = Math.abs(acc.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0));
  labelSumOut.textContent = `${out} RUP`;

  const interest = acc.filter(mov => mov > 0).map(mov => mov * acc.interestRate / 100).filter((mov, i, arr) => mov >= 1).reduce((acc,mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} RUP`;
};

// --------------- COMPUTING USERNAMES -------------------
const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
}
createUsernames(accounts);
console.log(accounts);

// -------------- UPDATE THE UI & DISPLAY PROPER MESSAGES --------------
const updateUI = function(acc){
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary 
  calcDisplaySummary(acc);
}

// -------------- IMPLEMENTING LOGIN -------------------
// --------------- EVENT HANDLER -----------------------
let currentAccount;

btnLogin.addEventListener('click', function(e){
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // Display the UI and give the proper message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

// ----------------- IMPLEMENTING TRANSFERS ------------------
btnTransfer.addEventListener('click', function(e){
  // To prevent form from submitting
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  // console.log(amount, receiverAcc);

  if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
    // Doing the transfers
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
});

// Deleting the user by using findIndex and splice method
btnClose.addEventListener('click', function(e){
  // Prevent form from submitting
  e.preventDefault();

  if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin)){

    // Finds the index that matches the entered username
    const index = accounts.findIndex(acc => {
      (acc.username === currentAccount.username)
    });

    // Deletes that particular user
    accounts.splice(index, 1);

    // Hide the UI
    containerApp.style.opacity = 0;
  }

  // Reset the username and password field
  inputCloseUsername.value = inputClosePin.value = '';
})
/////////////////////////////////////////////////
