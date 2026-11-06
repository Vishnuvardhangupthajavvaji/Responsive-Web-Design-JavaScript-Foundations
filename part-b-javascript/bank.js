"use strict";

// PART 1: Types & Coercion
function parseAmount(input) {
  if (input === null || input === undefined) throw new Error("Amount is required.");
  if (typeof input !== "string" && typeof input !== "number") throw new Error("Invalid amount type. Enter a string or number.");

  let value = input;
  if (typeof value === "string") {
    value = value.trim();
    // Number("") returns 0, so an empty string must be rejected first.
    if (value === "") throw new Error("Amount cannot be empty.");
  }

  const amount = Number(value);
  if (Number.isNaN(amount)) throw new Error("Invalid amount. Enter a valid number.");
  if (amount <= 0) throw new Error("Amount must be greater than zero.");
  return amount;
}

// + concatenates when one operand is a string: "5" + 2 is "52".
// - converts operands to numbers: "5" - 2 is 3. typeof null is "object" for historical reasons.
const testInputs = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];
for (const input of testInputs) {
  try {
    console.log("Valid amount:", parseAmount(input));
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// PART 2: Scoping & Hoisting
// const protects the unchanged bank name; let allows the transaction counter to increment.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;
console.log("Bank:", BANK_NAME);
transactionCounter += 1;
console.log("Transaction counter:", transactionCounter);

// HOISTING DEMO
// Execution-context creation prepares declarations; execution then evaluates statements in order.
console.log("var before declaration:", hoistedVar);
var hoistedVar = "declared with var";

try {
  console.log(hoistedLet);
  let hoistedLet = "declared with let";
} catch (error) {
  console.log("let before declaration:", error.name + ": " + error.message);
}

announce();
function announce() {
  console.log("Function declaration was hoisted successfully.");
}

try {
  notify();
} catch (error) {
  console.log("Function expression before definition:", error.name + ": " + error.message);
}
var notify = function () {
  console.log("Function expression executed.");
};

// var shares one function-scoped i, so callbacks see 3; let creates a fresh binding per iteration.
for (var i = 0; i < 3; i++) {
  setTimeout(function () { console.log("var loop:", i); }, 0);
}
for (let i = 0; i < 3; i++) {
  setTimeout(function () { console.log("let loop:", i); }, 0);
}
