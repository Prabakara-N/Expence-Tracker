"use strict";

//elements
const balanceEl = document.getElementById("balance");
const moneyPlusEl = document.getElementById("income-amt");
const moneyMinusEl = document.getElementById("expense-amt");
const listEl = document.getElementById("lists");
const formEl = document.getElementById("form");
const transactionEl = document.getElementById("transaction");
const amountEl = document.getElementById("amount-input");

//global variables
let transactions = [];
let income = 0;
let expense = 0;
let balance = 0;

//functions
//initial setting
function init() {
  listEl.innerHTML = null;
}

//calculating income & expensive
function updateValue() {
  //chaining array methods

  //map=> for storing a amount values in array
  //filter=> finding a value is < 0 or > 0
  //reduce=> to get a single value

  income = transactions
    .map((val) => val.amount)
    .filter((val) => val > 0)
    .reduce((preval, val) => preval + val, 0);

  expense = transactions
    .map((val) => val.amount)
    .filter((val) => val < 0)
    .reduce((preval, val) => preval + val, 0);

  balance = transactions
    .map((val) => val.amount)
    .reduce((preval, val) => preval + val, 0);

  //innerText
  moneyPlusEl.innerText = `₹${income}`;
  moneyMinusEl.innerText = `₹${Math.abs(expense)}`;
  balanceEl.innerText = `₹${balance}`;
}

//delete the output
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  //calling init function
  init(); //everytime the history will null and below we calling addtransaction DOM to re-add balance output

  //readd the list elements
  transactions.forEach((transaction) => addTransactionDom(transaction));

  //calling calculated value
  updateValue();
}

//addtransaction to DOM
function addTransactionDom({ id, name, amount }) {
  //creating li element
  const liEl = document.createElement("li");

  //add classname to li element
  liEl.className = amount > 0 ? "plus" : "minus";

  //innerHTML
  liEl.innerHTML = `<span>${name}</span>
                    <span>₹${amount}</span>
                    <button class="delete-btn" onclick=deleteTransaction(${id})>X</button>`;

  //appendchild
  listEl.appendChild(liEl);
}

//event listneres
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    //validation user input
    transactionEl.value.trim() === "" ||
    amountEl.value.trim() === "" ||
    Number(amountEl.value === "0")
  ) {
    alert("Please Enter a Valid Transaction Details");
  } else {
    //create a transaction details
    const transaction = {
      id: Date.now(),
      name: transactionEl.value,
      amount: Number(amountEl.value),
    };

    //storing a value(object) to transactions Array
    transactions.push(transaction);

    //add transaction to DOM
    addTransactionDom(transaction);
  }

  //calling calculated value
  updateValue();

  //clear the input elements
  transactionEl.value = null;
  amountEl.value = null;
});

//initial setting
init();
