# Call, Apply, and Bind in JavaScript

## 🔹 What is it?

`call`, `apply`, and `bind` are JavaScript methods used to **explicitly set the value of `this`** inside a function. These methods allow precise control over the execution context (`this`) of a function.

They are part of the **Function prototype** in JavaScript and are especially useful when working with functions that are reused across multiple objects or delayed in time (e.g., in callbacks or event handlers).

---

## 🔸 Technical Definitions

### 🔹 `call()`

Executes the function immediately and explicitly sets `this` to the provided object. Arguments are passed individually.

### 🔹 `apply()`

Executes the function immediately and explicitly sets `this` to the provided object. Arguments are passed as an array.

### 🔹 `bind()`

Returns a **new function** with `this` bound to the provided object. This new function can be called later with or without arguments. It also enables **partial function application**.

---

## 🔸 call()

```js
function greet(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const person = { name: 'Alice' };
greet.call(person, 'Hi'); // Hi, I'm Alice
```

---

## 🔸 apply()

```js
greet.apply(person, ['Hello']); // Hello, I'm Alice
```

---

## 🔸 bind()

```js
const sayHi = greet.bind(person, 'Hey');
sayHi(); // Hey, I'm Alice
```

---

## ✅ Advantages of `call`, `apply`, and `bind`

* 🔹 You can **explicitly bind `this`** to any object.
* 🔹 Useful when passing methods as **callbacks or event handlers**, where `this` context might be lost.
* 🔹 Allows **method borrowing**, enabling one object to use another object’s method.
* 🔹 Enables **partial application**, where some arguments are preset (using `bind`).
* 🔹 Helps with **code reuse** and decouples functions from specific objects.

---

## 🧠 Real-World Use Case: Method Borrowing

```js
const person1 = {
  name: 'Alice',
  greet() { console.log("Hi, I'm " + this.name); }
};

const person2 = { name: 'Bob' };

person1.greet.call(person2); // Hi, I'm Bob
```

**Explanation**: `person2` doesn't have its own `greet` method. By borrowing `person1`'s `greet` method using `call`, we can reuse the logic with `person2`'s context.

---

## 🧪 Real-World Use Case: Partial Application with `bind()`

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10
```

**Explanation**: `double` is a partially applied function where `a` is always 2. You only pass `b` during execution.

---

## 🕗 Use in Event Handlers

```js
const button = document.querySelector('button');

const user = {
  name: 'Alice',
  handleClick() {
    console.log(`Clicked by ${this.name}`);
  }
};

button.addEventListener('click', user.handleClick.bind(user));
```

**Explanation**: Without `bind`, `this` inside `handleClick` would point to the button element, not the `user` object. Using `bind` ensures the correct `this`.

---

## 📌 Summary

| Method  | Executes? | Parameters        | Purpose                |
| ------- | --------- | ----------------- | ---------------------- |
| `call`  | Yes       | List              | Immediate invocation   |
| `apply` | Yes       | Array             | Immediate invocation   |
| `bind`  | No        | List (binds only) | Returns bound function |

---
