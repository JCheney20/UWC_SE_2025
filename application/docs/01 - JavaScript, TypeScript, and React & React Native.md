## Quickstart Guide to Javascript, TypeScript, and React

### 1. JavaScript (JS) - The Language of the Web

JavaScript is a high-level, interpreted programming language. It's the core of web development, bringing interactivity to websites. Think of it as the "behavior" layer of a webpage, whereas HTML is the "structure" and CSS is the "style."

**Variables:**

In JS, you declare variables using `let` (for reassignable variables) and `const` (for variables that won't be reassigned).

```javascript
let userName = "Bob"; // A reassignable variable
const year = 2025; // A constant variable
```

**Data Types:**

*   `string`: Text (e.g., `"Hello"`)
*   `number`: Integers and floats (e.g., `10`, `3.14`)
*   `boolean`: `true` or `false`
*   `null`: Intentional absence of any object value
*   `undefined`: A variable that has been declared but not yet assigned a value
*   `object`: Collections of key-value pairs (more on this later)
*   `array`: Ordered lists of values

```javascript
let message = "Welcome!";
let age = 22;
let isActive = true;
let favoriteFood = null;
let favoriteColor; // undefined

let user = {
  name: "Bob",
  age: 22,
};

let numbers = [1, 2, 3, 4, 5];
```

**Functions:**

Functions are blocks of code designed to perform a particular task similar to methods in Java.

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Print the output
console.log(greet("Bob")); // Output: Hello, Bob!

// Arrow function (common in modern JS)
const add = (a, b) => {
  return a + b;
};
console.log(add(5, 3)); // Output: 8

// Shorter arrow function for single-line returns
const multiply = (a, b) => a * b;
console.log(multiply(4, 2)); // Output: 8
```

**Conditional Statements (if/else):**

Similar to Java.

```javascript
let temperature = 25;
if (temperature > 20) {
  console.log("It's warm.");
} else {
  console.log("It's cool.");
}
```

**Loops (for/while):**

Again, quite similar to Java.

```javascript
for (let i = 0; i < 3; i++) {
  console.log(`Loop iteration: ${i}`);
}

let count = 0;
while (count < 2) {
  console.log(`While loop count: ${count}`);
  count++;
}
```

**Objects:**

Objects are collections of properties, where each property has a name (key) and a value. They are similar to `HashMaps` or `structs` in other languages.

```javascript
const car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
  start: function () {
    console.log("Engine started!");
  },
};

console.log(car.make); // Output: Toyota
car.start(); // Output: Engine started!
```

**Arrays:**

Arrays are ordered lists of values.

```javascript
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // Output: apple
fruits.push("date"); // Add an element
console.log(fruits); // Output: ["apple", "banana", "cherry", "date"]
```

### 2. TypeScript (TS) - JavaScript with Static Types

TypeScript is a superset of JavaScript, meaning all valid JavaScript code is also valid TypeScript code. The main advantage of TypeScript is that it adds **static typing** to JavaScript. This means you can define the types of your variables, function parameters, and return values, which helps catch errors during development rather than at runtime. It's like having a type checker for your JavaScript!

**Basic Types:**

```typescript
let myName: string = "Bob";
let myAge: number = 22;
let isStudent: boolean = true;
let courses: string[] = ["Algorithms", "Databases"];
```

**Type Aliases (using `type`):**

```typescript
// Defining a type alias for an object
type User = {
  id: number;
  name: string;
  email?: string; // The '?' makes email optional
};

const user1: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const user2: User = {
  id: 2,
  name: "Bob",
};

// Defining a type alias for a union of types
type Status = "pending" | "completed" | "failed";

let currentStatus: Status = "pending";
// currentStatus = "in progress"; // This would be a TypeScript error!
```

**Functions with Types:**

```typescript
type AddFunction = (a: number, b: number) => number;

const addNumbers: AddFunction = (num1, num2) => {
  return num1 + num2;
};

function logMessage(message: string): void {
  // `void` means the function doesn't return anything
  console.log(message);
}
```

### 3. React - Building User Interfaces

React is a JavaScript library for building user interfaces. It allows you to create complex UIs from small and isolated pieces of code called "components." React uses a concept called the "Virtual DOM" for efficient updates to the user interface.

**Key Concepts:**

*   **Components:** The building blocks of a React application. They are essentially JavaScript functions that return JSX.
*   **JSX:** A syntax extension for JavaScript that looks a lot like HTML. It allows you to write UI elements directly within your JavaScript code.
*   **Props:** (short for properties) are how you pass data from a parent component to a child component. Think of them as function arguments.
*   **State:** Data that is managed *within* a component and can change over time. When state changes, React re-renders the component.

**Example Component (using TypeScript and Functional Components):**

```tsx
import React, { useState } from "react";

// Define the type for the props of the Greeting component
type GreetingProps = {
  name: string;
  message?: string; // Optional message prop
};

const Greeting = (props: GreetingProps) => {
  // Using destructuring for props
  const { name, message = "Welcome" } = props;
  const [count, setCount] = useState(0); // State for a counter

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="greeting-card">
      <h1>
        {message}, {name}!
      </h1>
      <p>You have clicked {count} times.</p>
      <button onClick={incrementCount}>Click Me</button>
    </div>
  );
};

// Main App component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Using our Greeting component */}
        <Greeting name="Bob" message="Hello" />
        <Greeting name="React Learner" /> {/* Uses default message */}
      </header>
    </div>
  );
}

export default App;
```

**Explanation:**

*   `import React, { useState } from 'react';`: Imports React and the `useState` hook. Hooks are special functions that let you "hook into" React features like state and lifecycle methods in functional components.
*   `type GreetingProps = { ... };`: Defines the types for the props our `Greeting` component expects.
*   `const Greeting = (props: GreetingProps) => { ... };`: This is a functional component. It takes `props` as an argument, which TypeScript helps us type-check.
*   `const [count, setCount] = useState(0);`: This is the `useState` hook. It declares a "state variable" `count` and a function `setCount` to update it. The initial value is `0`.
*   `onClick={incrementCount}`: Event handling in React. You pass a function reference to the `onClick` prop.
*   `<h1>...</h1>`: This is JSX. It looks like HTML but is actually JavaScript. React knows how to render this into the actual DOM.
*   `export default App;`: Makes the `App` component available for other files to import.

### React vs. React Native

This is a crucial distinction, especially for a Java developer used to platform-specific development.

**React (Web):**

*   **What it is:** A JavaScript library for building **user interfaces for web applications**.
*   **Target Platform:** Runs in a web browser.
*   **Output:** Generates HTML, CSS, and JavaScript that browsers understand.
*   **Components:** Uses standard web elements (e.g., `<div>`, `<p>`, `<img>`) within JSX. These are ultimately rendered as native browser elements.
*   **Styling:** Uses CSS, CSS-in-JS libraries, or inline styles.
*   **Deployment:** Your compiled JavaScript, HTML, and CSS files are served from a web server.

**React Native (Mobile):**

*   **What it is:** A framework for building **native mobile applications** using JavaScript and React.
*   **Target Platforms:** iOS and Android.
*   **Output:** Does *not* generate web views. Instead, it renders **native UI components** of the target platform (e.g., `UIView` on iOS, `android.view.View` on Android).
*   **Components:** Uses React Native-specific components like `<View>`, `<Text>`, `<Image>`, `<Button>`. These components are mapped directly to their native counterparts.
*   **Styling:** Uses a JavaScript-based styling system similar to CSS, but with different properties and units (e.g., `flexbox` for layout, but no `float`).
*   **Deployment:** Your JavaScript code is bundled with a native application shell. The app is then deployed to app stores (Apple App Store, Google Play Store).

**Key Difference Summarized:**

*   **React (Web)** builds applications that run *in a browser* and render web technologies (HTML, CSS).
*   **React Native** builds applications that run *on mobile devices* and render *native UI components* (iOS/Android).

You use the *same React principles* (components, props, state, JSX syntax) for both, but the underlying rendering mechanism and the specific components you use are different.

