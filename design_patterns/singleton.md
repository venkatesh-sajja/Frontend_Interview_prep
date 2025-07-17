## 🔍 **Singleton Design Pattern – Revision Notes**

---

### ✅ **Definition**

The **Singleton Design Pattern** ensures that **only one instance** of a class or object exists **throughout the entire application**.

* Even if multiple instances are created, they all **reference the same object**.
* This pattern is useful when you need a **shared resource** like a **global state, cache, or configuration manager**.
* Common in **React Context**, **Redux**, **Logging**, or **Database connection** handling.

---

### 🧱 **Example: Singleton Class in JavaScript**

```js
class SettingsMaster {
  constructor() {
    if (SettingsMaster.instance) {
      return SettingsMaster.instance; // ✅ Return existing instance
    }

    this.settings = {
      theme: "dark",
    };

    SettingsMaster.instance = this; // ✅ Store the singleton instance
    return this;
  }

  setTheme(value) {
    this.settings.theme = value;
  }

  getTheme() {
    return this.settings;
  }
}

const myTheme = new SettingsMaster();
console.log(myTheme.getTheme()); // "dark"

const myTheme2 = new SettingsMaster();
myTheme2.setTheme("normal");

console.log(myTheme.getTheme());  // "normal"
console.log(myTheme2.getTheme()); // "normal"
```

---

### 🔁 **What's Happening?**

* `myTheme` and `myTheme2` are two variables.
* But both refer to the **same instance** of `SettingsMaster`.
* Changing the state via one reflects in the other.

---

### 📊 **Functional Singleton (Closure-based)**

```js
const themeSettings = (function () {
  let instance;

  function createInstance() {
    let settings = { theme: "dark" };
    return {
      setTheme: function (value) {
        settings.theme = value;
      },
      getTheme: function () {
        return settings.theme;
      },
    };
  }

  return {
    createSettings: function () {
      if (instance) return instance;
      instance = createInstance();
      return instance;
    },
  };
})();

const inst1 = themeSettings.createSettings();
console.log(inst1.getTheme());        // "dark"
inst1.setTheme("light");

const inst2 = themeSettings.createSettings();
console.log(inst2.getTheme());        // "light"
inst2.setTheme("checking");

console.log(inst1.getTheme());        // "checking"
console.log(inst2.getTheme());        // "checking"
```

---

### 🌐 **React Context Example (Conceptual)**

React's Context API behaves like a singleton:

* You define global state in one place.
* No matter how many components consume it, they refer to the same context.

---

### 🗞 **Final Thought**

> Singleton ensures **controlled, consistent access** to a **shared instance**. It's perfect for global settings, themes, caches, and logging systems.

Use it wisely to **avoid unwanted coupling** and maintain **testability**.
