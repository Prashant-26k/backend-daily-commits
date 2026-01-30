# Backend Daily Commits

- This repository tracks my daily backend practice.
- Each commit represents code that I wrote, ran, and understood.

## Rules I Follow

- One meaningful commit per day.
- No commits without running code.
- Explanation written in my own words.
- Every 7th day is reserved for revision; no new code is added on that day.

-----

## Progress

- Day 1: JavaScript Event Loop
- Day 2: Microtasks vs Macrotasks (Nesting & Priority)
- Day 3: Closures
- Day 4: `this` and Prototypes
- Day 5: Async/Await Error Handling
- Day 6: Node.js Architecture
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
- Classes are syntax sugar over constructor functions.
- Class methods are stored on the prototype.
- Behavior is identical to prototype-based implementation.

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

-----

## Day 6 : Goal
Understand how Node.js handles concurrency using the event loop and clearly distinguish between blocking and non-blocking operations.

---

## What I Understood

### 1. Top-Level Execution
- Top-level JavaScript runs immediately on the call stack.
- Asynchronous APIs register callbacks and hand control to the event loop.

---

### 2. Event Loop Phases
- **Timers Phase**: Executes `setTimeout` callbacks.
- **Poll Phase**: Executes completed I/O callbacks (`fs.readFile`).
- **Check Phase**: Executes `setImmediate` callbacks.
- Execution order depends on the current event loop phase, not the order of code.

---

### 3. setTimeout vs setImmediate
- `setTimeout(0)` executes in the timers phase.
- `setImmediate()` executes in the check phase.
- Their execution order at top level is not guaranteed.

---

### 4. Non-Blocking I/O
- `fs.readFile` is asynchronous and offloaded to libuv.
- The JavaScript thread remains free during file I/O.
- The callback is queued in the poll phase once I/O completes.

---

### 5. Event Loop Blocking
- A CPU-heavy JavaScript loop runs on the main thread.
- While blocked:
  - Timers do not execute
  - I/O callbacks are delayed
  - `setImmediate` callbacks are delayed
- This blocks the entire Node.js process.

---

### 6. CPU-Intensive but Non-Blocking Work
- `crypto.pbkdf2` performs CPU-heavy work in the libuv thread pool.
- It does not block the event loop.
- Callback execution still depends on event loop availability.

---

### 7. Thread Pool Behavior
- Node.js uses a fixed-size thread pool (default size: 4).
- CPU-intensive native tasks run in parallel up to this limit.
- Extra tasks wait until a worker thread becomes available.

---

## Key Insight
Node.js is non-blocking by design, but CPU-heavy JavaScript can block the event loop and freeze the application.

-----

## Day 7 : Goal
- Week 1 Revision.

## What I Understood

### JavaScript Execution Model
- JavaScript executes code on a single thread using a call stack.
- Synchronous code is executed first, and asynchronous callbacks are handled by the event loop.

### Event Loop
- The event loop is a runtime mechanism that checks whether the call stack is empty and decides when queued callbacks can be executed.
- High priority tasks like `Promises` are placed in the microtask queue.
- Low priority tasks like `setTimeout` are placed in the macrotask queue and are executed only after all microtasks are completed.

### Closures
- Closures are functions bundled together with their lexical environment.
- They allow functions to access variables from their outer scope even after the outer function has finished execution.

### Prototypes
- Prototypes are objects that are attached to objects when they are created by the JavaScript engine.
- JavaScript does not have classical inheritance. Instead of copying methods, objects delegate property access through the prototype chain.

### Async/Await and Error Handling
- Async/await provides a cleaner syntax for handling asynchronous code but must be handled carefully using try/catch blocks.
- Since `await` throws a rejected Promise as an exception, proper error handling is required.

### Node.js Concurrency Model
- Although JavaScript runs on a single thread, Node.js achieves concurrency by offloading I/O operations to the environment (libuv).
- Heavy I/O operations do not block the call stack, but CPU-intensive tasks do.

### Key Differences Between Browser and Node
- Node.js does not have a render phase.
- Node.js has additional queues such as `process.nextTick`.
- Concurrency comes from the event loop and thread pool, not from JavaScript itself.

### What Became Clear This Week
- Understanding queues and execution priority matters more than memorizing APIs.
- Delays do not control execution order — queues do.

-----

# Day 8 — HTTP Basics, REST Principles & Hello API

## Goal
- Understand HTTP fundamentals
- Learn REST principles
- Build a basic Hello API using Node.js

---

## What I Learned Today

### 1. HTTP Basics
- HTTP is a stateless request–response protocol.
- Every HTTP request contains:
  - Method (GET, POST, PUT, DELETE, etc.)
  - URL (path + query parameters)
  - Headers
  - Optional body
- Every HTTP response contains:
  - Status code
  - Headers
  - Response body

Important HTTP methods:
- GET → Fetch data
- POST → Create data
- PUT → Replace data
- PATCH → Update part of data
- DELETE → Remove data

Important HTTP status codes:
- 200 → Success
- 201 → Created
- 400 → Bad request
- 404 → Not found
- 500 → Server error

---

### 2. REST Principles
- REST is an architectural style, not just JSON over HTTP.
- REST APIs are:
  - Stateless (server does not store client state)
  - Resource-based (use nouns like `/users`, not verbs)
  - Use HTTP methods correctly
  - Use proper status codes
- Each request must contain all required information.

Example:
- `/hello` → resource
- `/hello/users/101` → nested resource with path parameter

---

### 3. Hello API
- Built a simple REST API using Node.js native HTTP module (ES6).
- Implemented routing manually without any framework.
- API endpoints:

#### GET /hello
Response:
```json
{
  "message": "Hello API"
}
```
#### GET /hello?name=Prashant
Response:
```json
{
  "message": "Hello Prashant"
}
```

#### Invalid Route
Response:
```json
{
  "error": "Not Found"
}
```



