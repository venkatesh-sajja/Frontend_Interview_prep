# 🧠 JavaScript Event Handling: Bubbling, Capturing, Delegation

---

## 🔄 Event Bubbling

### ✅ Definition

**Event bubbling** is the process where an event starts at the **target element** and bubbles up through the ancestors (parent, grandparent, etc.) to the root (`document`).

### ✅ Example:

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click Me</button>
  </div>
</div>
```

```js
document.getElementById("grandparent").addEventListener("click", () => {
  console.log("Grandparent clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});
```

### ✅ Output:

```
Child clicked
Parent clicked
Grandparent clicked
```

### ✅ Stop Bubbling:

```js
document.getElementById("child").addEventListener("click", (e) => {
  e.stopPropagation(); // Stops event bubbling
  console.log("Child clicked without bubbling");
});
```

---

## 🕽️ Event Capturing

### ✅ Definition

**Event capturing** (also called "capture phase") is when the event is caught **from the top element down to the target element** before it reaches the target.

### ✅ Example:

```js
document.getElementById("a").addEventListener("click", () => {
  console.log("A clicked during capture");
}, true); // ☝ 'true' enables capture

document.getElementById("a").addEventListener("click", () => {
  console.log("A clicked during bubble");
}); // ☝ default is bubble
```

### ✅ Event Flow (when clicking on target inside A):

```
A clicked during capture
A clicked during bubble
```

---

## ⚡ Event Delegation

### ✅ Definition

**Event delegation** is a technique where a **single event listener** is attached to a **parent element** to handle events for current and future child elements.

It works because of **event bubbling**.

### ✅ HTML:

```html
<ul id="list">
  <li data-index="1">Item 1</li>
  <li data-index="2">Item 2</li>
</ul>
```

### ✅ JavaScript:

```js
document.getElementById("list").addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log("Clicked:", event.target.textContent);
    console.log("Data-index:", event.target.dataset.index);
  }
});
```

### ✅ Add Item Dynamically:

```js
const newItem = document.createElement("li");
newItem.textContent = "Item 3";
newItem.dataset.index = "3";
document.getElementById("list").appendChild(newItem);
```

✅ Event delegation still works for `Item 3`!

---

## 📦 Accessing Attributes from event.target

You can get any attribute or content from `event.target`:

```js
element.addEventListener("click", (event) => {
  const target = event.target;

  console.log(target.id);
  console.log(target.className);
  console.log(target.dataset.index); // For data-index="..."
  console.log(target.textContent);
});
```

---

## ✅ React Tab Switcher Example

```jsx
import { useState } from "react";

const tabs = [
  { id: "home", label: "Home", content: "🏠 Welcome Home" },
  { id: "about", label: "About", content: "📖 About Us" },
  { id: "contact", label: "Contact", content: "📞 Contact Us" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-tab={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-200"}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} data-content={tab.id}>
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
```

---

## ✅ Summary Table

| Concept    | Direction     | Default | Can Stop?           | Used In                        |
| ---------- | ------------- | ------- | ------------------- | ------------------------------ |
| Bubbling   | Bottom → Up   | ✅ Yes   | `stopPropagation()` | Delegation, global handlers    |
| Capturing  | Top → Bottom  | ❌ No    | `stopPropagation()` | Rare (e.g., security, logging) |
| Delegation | Uses bubbling | ✅ Yes   | No                  | Menus, Lists, Chat, Forms      |
