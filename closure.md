# Closures in JavaScript

## 🔹 What is a Closure?

A **closure** is a function bundled together with references to its surrounding lexical environment. In simpler terms, a closure gives you access to an outer function’s scope from an inner function, even after the outer function has returned.

> A closure is created every time a function is defined, at function creation time.

---

## ✅ Advantages of Closures

### 1. **Data Encapsulation / Privacy**

Closures allow variables to be kept private inside a function scope and accessed only through privileged methods.

```js
function createCounter() {
  let count = 0; // private variable
  return {
    increment() { count++; },
    getCount() { return count; }
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
console.log(counter.count); // undefined
```

**Explanation**: `count` is not directly accessible from outside; it’s private inside the closure. Only the returned methods can access and modify it.

---

### 2. **Memoization / Caching**

Closures can be used to remember results of expensive function calls.

```js
function memoizedAdd() {
  const cache = {};
  return function(n) {
    if (cache[n]) {
      return cache[n];
    } else {
      console.log('Calculating...');
      cache[n] = n + 10;
      return cache[n];
    }
  };
}

const add = memoizedAdd();
console.log(add(5)); // Calculating... 15
console.log(add(5)); // 15 (from cache)
```

**Explanation**: The `cache` variable persists due to closure, improving performance.

---

### 3. **Maintaining State Between Function Calls**

Closures can maintain state in asynchronous code or repeated executions.

```js
function timer() {
  let seconds = 0;
  setInterval(() => {
    seconds++;
    console.log(`Elapsed: ${seconds} seconds`);
  }, 1000);
}

timer();
```

**Explanation**: The `seconds` variable remains in memory and gets updated every second.

---

## 🧠 Real-World Use Case: Controlled Access to Private Variables

Closures are used in module patterns to expose only the necessary parts of logic.

```js
function BankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
    },
    withdraw(amount) {
      if (amount <= balance) balance -= amount;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300
console.log(account.balance); // undefined
```

**Explanation**: Only the returned functions have access to `balance`. It can't be changed or read directly, ensuring better data integrity.

---

## 📌 Summary

| Advantage           | Explanation                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| ✅ Data Privacy      | Variables are hidden and cannot be accessed directly from outside scope. |
| ✅ Memoization       | Remember results to avoid recomputation.                                 |
| ✅ State Persistence | Maintains local state even after outer function returns.                 |
| ✅ Modular Code      | Useful for building modules with private/public separation.              |

---
