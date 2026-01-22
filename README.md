# Backend Daily Commits

This repository tracks my daily backend practice.
Each commit represents code that I wrote, ran, and understood.

## Rules I Follow
- One meaningful commit per day
- No commits without running code
- Explanation written in my own words

## Progress
- Day 1: JavaScript Event Loop

## Goal

To understand how JavaScript executes:
- synchronous code
- asynchronous callbacks like microtasks (Promises)
- macrotasks (setTimeout)

### What I Observed

Synchronous code executes first because it is pushed directly onto the call stack.

Promise callbacks execute next because they are microtasks, and the microtask queue is always drained before moving to macrotasks, even if `setTimeout` has zero delay.

So the event loop execution order looks like:

Call Stack → Microtasks (all) → One Macrotask → repeat

### Key Insight
The event loop never interrupts running code; it only schedules callbacks
after the call stack becomes empty.
