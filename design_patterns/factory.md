### 🏭 Factory Design Pattern (JS & React Context Example)
---
The Factory Design Pattern is a creational design pattern used to encapsulate object creation logic. 
It defines a common interface or method for creating objects, 
but the specific class of object that gets created is determined internally, 
often based on input parameters.

Rather than calling new directly to instantiate objects, 
the Factory Pattern provides a dedicated method that handles object creation. 
This makes the code more modular, scalable.

In React, this pattern shines when you need to render components conditionally or dynamically, 
such as form elements generated from a JSON config. 
Combining the Factory Pattern with React Context allows the factory logic to be reused throughout your application — making component creation flexible and centralized.
---
### ✅ Summary
- Factory Pattern separates object creation from usage.
- It's useful for dynamically creating components in JavaScript or React.
- Context + Factory is a powerful combo in React for dynamic rendering.

### ✅ JavaScript Example — Notification Factory

```js
// Define different types of notifications
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

// Factory class to create notifications
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

// Usage
const newNotification = NotificationFactory.createNotification("email", "v2@gmail.com");
newNotification.send();
```

---

### ✅ React Example — Component Factory with Context

```jsx
import React, { createContext, useContext } from "react";

// 1. Define your UI components
const Input = ({ placeholder }) => <input placeholder={placeholder} />;

const Select = ({ options }) => (
  <select>
    {options.map((opt, i) => (
      <option key={i} value={opt.key}>{opt.value}</option>
    ))}
  </select>
);

const Button = ({ label }) => <button>{label}</button>;

// 2. Create a context to provide the factory function
const ComponentContext = createContext();

// 3. Create a context provider that holds the factory logic
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

// 4. Create a custom hook to use the factory from context
const useComponentFactory = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useComponentFactory must be used within a ComponentProvider");
  }
  return context.getComponent;
};

// 5. Create the App that uses dynamic config rendering
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

// 6. Wrap the App with the ComponentProvider
const Root = () => (
  <ComponentProvider>
    <App />
  </ComponentProvider>
);

export default Root;
```

---


