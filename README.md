# Backend Daily Commits

- This repository tracks my daily backend practice.
- Each commit represents code that I wrote, ran, and understood.

## Rules I Follow

- One meaningful commit per day
- No commits without running code
- Explanation written in my own words

-----

## Progress

- Day 1: JavaScript Event Loop
- Day 2: Microtasks vs Macrotasks (Nesting & Priority)
- Day 3: Closures

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


