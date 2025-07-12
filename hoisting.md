# Hoisting in JavaScript

## 🔹 What is Hoisting?

Hoisting is JavaScript's default behavior of **moving declarations to the top** of their containing scope during the compilation phase.

> Only **declarations** (not initializations) are hoisted.

---

## 🔸 Technical Explanation

Before code is executed, JavaScript parses the code and allocates memory for variable and function declarations. This means:

* **Variables declared with `var`** are hoisted and initialized as `undefined`.
* **Function declarations** are hoisted entirely (including their body).
* **`let` and `const`** are hoisted but **not initialized** (they exist in a **temporal dead zone** until the line they are declared).

---

## 🔍 Example: Variable Hoisting with `var`

```js
console.log(a); // undefined
var a = 5;
```

This is interpreted by JavaScript as:

```js
var a;
console.log(a); // undefined
a = 5;
```

---

## 🔍 Example: `let` and `const` (Temporal Dead Zone)

```js
console.log(b); // ❌ ReferenceError
let b = 10;
```

Here, `b` is hoisted but not initialized. Accessing it before the declaration causes an error.

---

## 🔍 Example: Function Declaration Hoisting

```js
greet(); // ✅ Hello

function greet() {
  console.log("Hello");
}
```

Function declarations are hoisted completely and can be called before they are defined.

---

## 🔍 Example: Function Expression (Not Hoisted Like Declarations)

```js
sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hi");
};
```

Here, `sayHi` is hoisted as a variable, but not as a function. So it's initialized as `undefined`.

---

## ✅ Advantages of Understanding Hoisting

* 🔹 Helps avoid bugs due to accessing variables before they're initialized.
* 🔹 Improves debugging by understanding why `undefined` or `ReferenceError` occurs.
* 🔹 Clarifies the difference between `var`, `let`, and `const`.
* 🔹 Essential for mastering scopes and closures in JavaScript.

---

## 🧠 Real-World Use Case: Function Organization

Knowing that function declarations are hoisted allows you to place high-level logic at the top and detailed logic at the bottom of your script.

```js
main();

function main() {
  greet();
}

function greet() {
  console.log("Hello from greet");
}
```

**Explanation**: You can organize code logically without worrying about the order of function declarations.

---

## 📌 Summary

| Feature              | Hoisted? | Initialized? | Notes                                       |
| -------------------- | -------- | ------------ | ------------------------------------------- |
| `var`                | ✅ Yes    | ✅ Yes        | Initialized to `undefined`                  |
| `let` / `const`      | ✅ Yes    | ❌ No         | Temporal Dead Zone until actual declaration |
| Function Declaration | ✅ Yes    | ✅ Yes        | Full function is hoisted                    |
| Function Expression  | ✅ Var    | ❌ Function   | Only variable is hoisted as `undefined`     |

---
