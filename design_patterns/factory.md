## 🏭 **Factory Design Pattern – Revision Notes**

---

### ✅ **Definition**

The **Factory Design Pattern** is a **creational design pattern** used to **encapsulate object creation logic**.

* Defines a **common interface** or method for creating objects.
* The specific class of object that gets created is determined **internally**, based on input.
* Avoids direct use of `new`, promoting **modular, scalable, and testable** code.
* In **React**, it is useful when rendering components dynamically or conditionally.

---

### 📦 **Summary**

* Factory Pattern separates object creation from usage.
* It's useful for dynamically creating components in JavaScript or React.
* **Factory + Context** in React offers reusable, centralized component creation.

---

### 💡 **JavaScript Example – Notification Factory**

```js
class EmailNotification {
  constructor(target) {
    this.target = target;
  }
  send() {
    console.log(`Sending Email to ${this.target}`);
  }
}

class SMSNotification {
  constructor(target) {
    this.target = target;
  }
  send() {
    console.log(`Sending SMS to ${this.target}`);
  }
}

class PushNotification {
  constructor(target) {
    this.target = target;
  }
  send() {
    console.log(`Sending Push Notification to ${this.target}`);
  }
}

class NotificationFactory {
  static createNotification(type, target) {
    switch (type.toLowerCase()) {
      case "email":
        return new EmailNotification(target);
      case "sms":
        return new SMSNotification(target);
      case "push":
        return new PushNotification(target);
      default:
        throw new Error("Unknown type");
    }
  }
}

const newNotification = NotificationFactory.createNotification("email", "v2@gmail.com");
newNotification.send();
```

---

### ⚛️ **React Example – Component Factory with Context**

```jsx
import React, { createContext, useContext } from "react";

const Input = ({ placeholder }) => <input placeholder={placeholder} />;
const Select = ({ options }) => (
  <select>
    {options.map((opt, i) => (
      <option key={i} value={opt.key}>{opt.value}</option>
    ))}
  </select>
);
const Button = ({ label }) => <button>{label}</button>;

const ComponentContext = createContext();

const ComponentProvider = ({ children }) => {
  const components = {
    input: Input,
    select: Select,
    button: Button,
  };

  const getComponent = (type, props) => {
    const Component = components[type.toLowerCase()];
    if (!Component) return <p>Unknown component type: {type}</p>;
    return <Component {...props} />;
  };

  return (
    <ComponentContext.Provider value={{ getComponent }}>
      {children}
    </ComponentContext.Provider>
  );
};

const useComponentFactory = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useComponentFactory must be used within a ComponentProvider");
  }
  return context.getComponent;
};

const App = () => {
  const config = [
    { type: "input", props: { placeholder: "Enter name" } },
    {
      type: "select",
      props: {
        options: [
          { key: "red", value: "Red" },
          { key: "blue", value: "Blue" },
        ],
      },
    },
    { type: "button", props: { label: "Submit" } },
  ];

  const getComponent = useComponentFactory();

  return (
    <div>
      {config.map((item, index) => (
        <div key={index}>{getComponent(item.type, item.props)}</div>
      ))}
    </div>
  );
};

const Root = () => (
  <ComponentProvider>
    <App />
  </ComponentProvider>
);

export default Root;
```

---

### 🗞 **Final Thought**

> Factory Pattern provides **flexibility** and **abstraction** in object creation. In JavaScript and React, it promotes cleaner, reusable code — especially when component types or structures are dynamic.
