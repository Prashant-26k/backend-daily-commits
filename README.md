# Backend Daily Commits

- This repository tracks my daily backend practice.
- Each commit represents code that I wrote, ran, and understood.

## Rules I Follow

- One meaningful commit per day.
- No commits without running code.
- Explanation written in my own words.

-----

## Progress

- Day 1: JavaScript Event Loop
- Day 2: Microtasks vs Macrotasks (Nesting & Priority)
- Day 3: Closures
- Day 4: `this` and Prototypes
- Day 5: Async/Await Error Handling
-----

## Day 1 : Goal

To understand how JavaScript executes:
- synchronous code
- asynchronous callbacks like microtasks (Promises)
- macrotasks (setTimeout)

### What I Observed

- Synchronous code executes first because it is pushed directly onto the call stack.

- Promise callbacks execute next because they are microtasks, and the microtask queue is always drained before moving to macrotasks, even if    
  `setTimeout` has zero delay.

- So the event loop execution order looks like:

- Call Stack → Microtasks (all) → One Macrotask → repeat

### Key Insight
- The event loop never interrupts running code, it only schedules callbacks after the call stack becomes empty.

-----

## Day 2 : Goal
- Understand execution priority when microtasks and macrotasks are nested
  inside each other.

## What I Observed
- All synchronus code executes first on the call stack.
- All Microtasks are executed first before the event loop moves to
  the next macrotask.
- A microtask scheduled inside a macrotask runs before the next macrotask.
- A macrotask scheduled inside a microtask waits for the next macrotask phase.

## Key Insight
- The event loop is driven by **queues and priority**, not by delay values.

-----

## Day 3 : Goal
- Understand what a closure is and how it retains memory.
- Understand how closures can cause memory leaks.

## What I Observed
- A closure is a function bundled together with its surrounding
  lexical environment.
- Closures allow functions to access private variables that are
  not directly accessible from outside their scope.

- A closure can retain variables from its outer function in memory.
  As long as a reference to the closure exists (for example, `Counter1`),
  the captured variables remain reachable and cannot be garbage collected.
  If such closures capture large or growing data and live for a long time,
  this can lead to memory leaks.

## Key Insight
- Garbage collection is based on reachability, not usage.
- Closures do not cause memory leaks by themselves, but long-lived
  closures holding unnecessary references can prevent memory from
  being freed.

-----

## Day 4 : Goal
- Understand how `this` works in different invocation contexts
- Learn how JavaScript shares methods using prototypes
- Compare constructor functions with class syntax
- Explore method borrowing and explicit `this` binding

---

## Concepts Covered

### 1. Constructor Function
- A normal function becomes a constructor when called using `new`
- `new` performs:
  1. Object creation
  2. Prototype linking
  3. `this` binding
  4. Implicit return of the object

---

### 2. Prototype Methods
- Methods defined on `Function.prototype` are shared
- Only one function exists in memory
- Instances delegate method lookup to the prototype

---

### 3. Method Borrowing
- Methods do not belong to objects — they belong to functions
- Using `call`, the same method can operate on different objects
- `this` is injected at call time

---

### 4. `this` Binding Differences

|   Invocation Style       |      `this` value         |
|--------------------------|---------------------------|
| Method call (`obj.fn()`) | Object before the dot     |
| Detached function call   | `undefined` (strict mode) |
| `call / apply`           | Explicitly provided object|
| `bind`                   | Permanently bound         |

---

### 5. Class Syntax
- Classes are syntax sugar over constructor functions
- Class methods are stored on the prototype
- Behavior is identical to prototype-based implementation

---

## Key Insight
JavaScript does not have classical inheritance.
It uses **prototype delegation**, and `this` is resolved **at runtime based on how a function is called**.

---

## Takeaway
Understanding prototypes and `this` explains:
- Method sharing
- Memory efficiency
- Why `bind` exists
- Why classes did not change JavaScript’s core model

-----

## Day 5 : Goal 
- Understand how async/await handles errors.
- Learn why try/catch is mandatory with async functions.
- Observe what happens during an unhandled promise rejection.

---

## Task Overview
Built a fake asynchronous API that:
- Randomly succeeds or fails
- Returns a Promise
- Is consumed using async/await

---

## What I Implemented

### 1. Fake Async API
- Uses `Promise`
- Randomly calls `resolve` or `reject`
- Simulates a real network request using `setTimeout`

### 2. Handled Error Case
- Wrapped `await` inside `try/catch`
- Prevents crashes
- Gracefully handles failure

```js
try {
  const result = await fakeApi();
} catch (error) {
  console.error(error.message);
}
```

## Key Insight
- `await` does not handle errors; it converts a rejected Promise into a thrown exception at the await line.
- If no `try/catch` (or upstream `.catch`) exists, the async function returns a rejected Promise, causing an unhandled rejection.


