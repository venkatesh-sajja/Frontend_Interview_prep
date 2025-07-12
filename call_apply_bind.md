# Call, Apply, and Bind in JavaScript

## 🔹 What is it?

`call`, `apply`, and `bind` are JavaScript methods used to **explicitly set the value of `this`** inside a function. These methods allow precise control over the execution context (`this`) of a function.

## Main Advantage: Explicit Control Over this

In JavaScript, the value of `this` can change depending on how a function is called (especially in callbacks, event handlers, etc.). These methods give you explicit control over the value of `this`.

---

**Real Interview Q: What's the difference between bind and call?**
`call` invokes the function immediately with a given `this` context, whereas `bind` returns a new function with that context, which can be invoked later.

---

### 1. Borrow Methods Between Objects

You can use a method of one object in the context of another.

```js
const person1 = { name: 'Alice' };
const person2 = { name: 'Bob' };

function sayHi() {
  console.log(`Hi, I'm ${this.name}`);
}

sayHi.call(person1); // Hi, I'm Alice
sayHi.call(person2); // Hi, I'm Bob
```

✅ Advantage: Avoid repeating code or duplicating methods.

---

### 2. Set `this` in Callbacks

In asynchronous or event-driven code, `this` might be lost. `bind()` helps preserve it.

```js
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    setTimeout(function () {
      this.count++;
      console.log(this.count);
    }.bind(this), 1000); // `this` refers to Counter instance
  }
}
```

✅ Advantage: Avoid bugs due to `this` becoming undefined or pointing to `window`.

---

### What Does "Explicit" Mean in This Context?

When we say `call`, `apply`, and `bind` let you **explicitly set `this`**, it means:

> You manually tell JavaScript what `this` should be.

Instead of relying on how a function is called (which normally determines `this`), you're saying:

> "Hey JavaScript, when this function runs, make sure `this` refers to this specific object."

---

### 🔍 Example Without Explicit Binding (Implicit)

```js
const person = {
  name: 'Alice',
  greet() {
    console.log(this.name);
  }
};

person.greet(); // 'Alice' — because `this` refers to `person`
```

Here, `this` is set implicitly by how the function is called (`person.greet()`).

---

### ✨ Now With Explicit Binding Using `call`

```js
const person = { name: 'Alice' };
function greet() {
  console.log(this.name);
}

greet.call(person); // 'Alice' — `this` is explicitly set to `person`
```

🔑 You're telling JavaScript:

> “Don’t guess who `this` is — I’ll tell you directly.”

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

## ⚙️ Implicit vs Explicit `this`

✅ Implicit `this` Example

```js
const person = {
  name: "Venkatesh",
  getName() {
    console.log(this.name);
  }
};

person.getName(); // Venkatesh
```

**Explanation**: Here, `this` is set implicitly to `person` because `getName` is called using dot notation (`person.getName()`).

✅ Explicit `this` Example

```js
const person1 = {
  name: "Venkatesh"
};
const person2 = {
  name: "Venkatesh Sajja"
};

function getName() {
  console.log(this.name);
}

getName.call(person1); // Venkatesh
getName.call(person2); // Venkatesh Sajja
```

**Explanation**: We use `call` to explicitly bind `this` because the method is not defined on the objects themselves.

---

## 📌 Summary

| Method  | Executes? | Parameters        | Purpose                |
| ------- | --------- | ----------------- | ---------------------- |
| `call`  | Yes       | List              | Immediate invocation   |
| `apply` | Yes       | Array             | Immediate invocation   |
| `bind`  | No        | List (binds only) | Returns bound function |

---
