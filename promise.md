## 🔁 **JavaScript Promises – Revision Notes**

---

### ✅ **Definition of Promises**

A **Promise** is an object that represents the **eventual completion** (or failure) of an asynchronous operation. It acts as a **placeholder** for a future value that will be resolved or rejected.

---

### 🧠 **Key Concepts**

* Promises help manage **asynchronous behavior** in JavaScript.
* A Promise has three states: **pending**, **fulfilled**, or **rejected**.
* `.then()` handles fulfilled results.
* `.catch()` handles errors.
* `.finally()` executes cleanup code regardless of the result.

---

### 💡 **Basic JavaScript Promise Example**

```js
const p = new Promise((res, rej) => {
  setTimeout(() => {
    res("resolved after 2000");
  }, 2000);
});

p.then(res => {
  console.log(res); // "resolved after 2000"
});
```

---

### 👨‍💻 **Fetching User Data with Promise**

```js
function getUserDetails() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        name: "Venkatesh",
        mail: "v@gmail.com",
        age: 28,
        gender: "male"
      };
      resolve(user);
    }, 2000);
  });
}

getUserDetails().then(res => {
  console.log(res);
});
```

---

### ⚛️ **React Example – Retry with Promises**

```jsx
import { useEffect, useState } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [errorStatus, setErrorStatus] = useState("");

  const retryAgain = (fn, delay = 1000, retry = 3) => {
    return new Promise((resolve, reject) => {
      function attempt(count) {
        fn()
          .then(resolve)
          .catch(err => {
            if (count === 0) return reject(err);
            setTimeout(() => {
              attempt(count - 1);
            }, delay);
          });
      }
      attempt(retry);
    });
  };

  const getUserDetails = (userId = null) => {
    return new Promise((resolve, reject) => {
      if (!userId) reject("UserId is missing in the props");
      setTimeout(() => {
        const user = {
          name: "Venkatesh",
          mail: "v@gmail.com",
          age: 28,
          gender: "male",
        };
        resolve(user);
      }, 2000);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    retryAgain(() => getUserDetails(12))
      .then(res => setUserDetails(res))
      .catch(err => setErrorStatus(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading ...</p>;
  if (errorStatus !== "") return <p>{errorStatus}</p>;

  return <p>user: {userDetails.name}</p>;
};

export default App;
```

---

### 🔁 **Retry Utility Function**

```js
function retry(fn, delay = 1000, retry = 3) {
  return new Promise((resolve, reject) => {
    function attempt(count) {
      fn()
        .then(res => resolve(res))
        .catch(err => {
          if (count === 0) return reject(err);
          setTimeout(() => {
            attempt(count - 1);
          }, delay);
        });
    }
    attempt(retry);
  });
}
```

---

### 🧪 **Promise.allSettled Example**

```js
const p1 = Promise.resolve("One");
const p2 = Promise.reject("Error");
const p3 = new Promise((res) => setTimeout(() => res("Three"), 1000));

Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results);
});
```

---

### 📦 **Promise.all Example (Fail Fast)**

```js
const p1 = new Promise((_, reject) =>
  setTimeout(() => reject("🔥 p1 failed"), 1000)
);
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("✅ p2 success"), 2000)
);
const p3 = new Promise((resolve) =>
  setTimeout(() => resolve("✅ p3 success"), 3000)
);

Promise.all([p1, p2, p3])
  .then((results) => {
    console.log("All succeeded:", results);
  })
  .catch((err) => {
    console.error("Promise.all failed fast:", err);
  });
```

---

### 🔧 **Polyfill: Promise.all**

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return resolve([]);
    let result = [];
    let fulfilledCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(res => {
          result[index] = res;
          fulfilledCount++;
          if (fulfilledCount === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
};
```

---

### 🔧 **Polyfill: Promise.allSettled**

```js
Promise.allSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let settledCount = 0;

    if (promises.length === 0) return resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: "fulfilled", value };
        })
        .catch(reason => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};
```

---

### 🔧 **Polyfill: Promise.any**

```js
Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejectionCount = 0;

    if (promises.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch(err => {
          errors[index] = err;
          rejectionCount++;
          if (rejectionCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};
```

---

### 🧪 **Promise.any Example**

```js
const p1 = Promise.reject("❌ Error 1");
const p2 = Promise.reject("❌ Error 2");
const p3 = new Promise((res) => setTimeout(() => res("✅ Success"), 1000));

Promise.any([p1, p2, p3])
  .then(console.log)
  .catch((err) => {
    console.error("🔥 All failed:", err);
    console.log(err.errors);
  });

Promise.any([
  Promise.reject("A"),
  Promise.reject("B")
]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors); // ["A", "B"]
});
```

---

### 🗞 **Final Thought**

> Promises provide a powerful way to write clean and manageable asynchronous JavaScript.
> They simplify chaining, retry logic, and integration into tools like React.
