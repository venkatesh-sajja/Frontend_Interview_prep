## 🏗️ **Builder Design Pattern – Revision Notes**

---

### ✅ **Definition**

The **Builder Design Pattern** allows you to **create a complex object step by step**.

* It **separates the construction logic** from the object’s representation.
* Enables the **same construction process** to produce **several variations** of the object.
* Useful when the object has **many parameters or configuration options**.
* Helps to **avoid constructor overloading** and improves **code readability**.

---

### 🧱 **Example: Burger Builder**

```js
class Burger {
  constructor() {
    this.size = null;
    this.onions = null;
    this.cheese = null;
    this.tomato = null;
    this.lettuce = null;
  }
}

class BurgerBuilder {
  constructor() {
    this.burger = new Burger();
  }

  setSize(size) {
    this.burger.size = size;
    return this;
  }

  setOnion(value) {
    this.burger.onions = value;
    return this;
  }

  setTomato(value) {
    this.burger.tomato = value;
    return this;
  }

  setCheese(value) {
    this.burger.cheese = value;
    return this;
  }

  setLettuce(value) {
    this.burger.lettuce = value;
    return this; // returning 'this' enables chaining
  }

  build() {
    return this.burger;
  }
}
```

---

### 🔁 **Why `return this` is Important**

Without `return this`, **method chaining doesn't work**.

✅ This works:

```js
const myBurger = new BurgerBuilder()
  .setSize("small")
  .setCheese("yes")
  .build();

console.log(myBurger);
```

❌ Without `return this`, you'd have to write:

```js
const builder = new BurgerBuilder();
builder.setSize("small");
builder.setCheese("yes");
const myBurger = builder.build();
```

---

### 🧠 **Behind the Scenes**

* Only **one instance** of `BurgerBuilder` is created.
* Each method modifies the **same internal burger object**.
* Chaining is possible because of `return this`.

---

### 🗞 **Final Thought**

> The Builder Pattern makes object construction **clear, flexible, and readable**, especially when objects have **lots of optional fields** or you want to **reuse construction logic** across variations.
