## ⏱️ JavaScript `setTimeout` and `setInterval` – Deep Dive

---

### ✅ Basic Definitions

| Function                 | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `setTimeout(fn, delay)`  | Executes `fn` **once** after `delay` milliseconds.       |
| `setInterval(fn, delay)` | Executes `fn` **repeatedly** every `delay` milliseconds. |

---

### 📌 Syntax

```js
const timeoutId = setTimeout(callback, delay, ...args);
const intervalId = setInterval(callback, delay, ...args);
```

---

### 🧠 `setTimeout` – Key Concepts

1. **Delay is Minimum Time**

```js
setTimeout(() => {
  console.log('Hi after 0 ms');
}, 0);

console.log('Sync log');
// Output:
// Sync log
// Hi after 0 ms
```

2. **Use for Controlled Repetition**

```js
function repeat() {
  console.log('Repeat with setTimeout');
  setTimeout(repeat, 1000);
}
setTimeout(repeat, 1000);
```

---

### 🧠 `setInterval` – Key Concepts

1. Executes every `delay` ms, regardless of previous execution time.

2. If callback is slow, execution drifts:

```js
setInterval(() => {
  const start = Date.now();
  while (Date.now() - start < 2000) {} // blocking
  console.log("Interval fired");
}, 1000);
```

---

### ⏳ Clearing Timers

```js
clearTimeout(timeoutId);
clearInterval(intervalId);
```

---

### 🧪 Interview Gotchas

#### 1. Passing Arguments

```js
setTimeout((name) => {
  console.log(`Hi ${name}`);
}, 1000, 'Venkatesh');
```

#### 2. Closure Trap in Loops

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 3 3 3
}

// Fix with let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000); // 0 1 2
}
```

#### 3. Recursive `setTimeout` vs `setInterval`

| Feature             | `setTimeout` (recursive) | `setInterval`  |
| ------------------- | ------------------------ | -------------- |
| Flexible            | ✅                        | ❌              |
| Accurate            | ✅                        | ❌ (drift risk) |
| Safe for long tasks | ✅                        | ❌              |

---

### ♻️ Drift Example

```js
let count = 0;
const interval = setInterval(() => {
  const now = new Date().toLocaleTimeString();
  console.log(`⏰ Tick ${++count} at ${now}`);
  if (count === 5) clearInterval(interval);
}, 1000);
```

---

### 🔍 Zero Delay Myth

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => console.log("Microtask"));

console.log("End");

// Output:
// Start
// End
// Microtask
// Timeout
```

---

### 🛠️ Use Cases

| Use Case          | `setTimeout`                    | `setInterval` |
| ----------------- | ------------------------------- | ------------- |
| Delayed execution | ✅                               | ❌             |
| Retry logic       | ✅ (recursive)                   | ❌             |
| Polling API       | ✅                               | ✅             |
| Animations        | ❌ (use `requestAnimationFrame`) | ❌             |

---

### 💡 Best Practices

* ✅ Prefer **recursive `setTimeout`** over `setInterval` for better control.
* ✅ Always **clear intervals** to avoid memory leaks.
* ⚠️ Avoid blocking logic inside intervals.
* ✅ Use **`requestAnimationFrame`** for animations.

---
