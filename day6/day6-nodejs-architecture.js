const fs = require('fs');        // Async file system APIs (handled by libuv)
const crypto = require('crypto'); // Uses libuv thread pool for CPU-intensive work

const start = Date.now();        // Used to measure total elapsed time

// setTimeout(0) → scheduled in the *timers phase* of the event loop
setTimeout(() => {
    console.log('Timer 1');
}, 0);

// setImmediate → scheduled in the *check phase* of the event loop
setImmediate(() => {
    console.log('Immediate fn 1');
});

// fs.readFile is NON-BLOCKING I/O
// File read is offloaded to libuv, JS thread remains free
// Callback is queued in the *poll phase*
fs.readFile('sample.txt', 'utf-8', () => {
    console.log('IO Polling Finish');

    // CPU-BLOCKING JavaScript
    // This loop runs on the main JS thread
    // Event loop is blocked during this time
    // Timers, I/O callbacks, immediates, and crypto callbacks are delayed
    const end = Date.now() + 5000;
    while (Date.now() < end) {}
    console.log('CPU blocking finished');

    // Still goes to timers phase, but execution waits until blocking ends
    setTimeout(() => {
        console.log('Timer 2');
    }, 0);

    // Delayed timer (timers phase)
    // Actual execution time depends on event loop availability
    setTimeout(() => {
        console.log('Timer 3');
    }, 5 * 1000);

    // setImmediate inside I/O callback
    // Typically runs before timers once poll phase completes
    setImmediate(() => {
        console.log('Immediate fn 2');
    });

    // CPU-INTENSIVE but NON-BLOCKING work
    // Runs on libuv thread pool (default size = 4)
    // Does NOT block the event loop
    // Callback execution still requires event loop to be free
    crypto.pbkdf2('password1', 'salt1', 100000, 1024, 'sha512', () => {
        console.log(`${Date.now() - start}ms`, 'Password 1 Done');
    });

    crypto.pbkdf2('password2', 'salt1', 100000, 1024, 'sha512', () => {
        console.log(`${Date.now() - start}ms`, 'Password 2 Done');
    });

    crypto.pbkdf2('password3', 'salt1', 100000, 1024, 'sha512', () => {
        console.log(`${Date.now() - start}ms`, 'Password 3 Done');
    });

    crypto.pbkdf2('password4', 'salt1', 100000, 1024, 'sha512', () => {
        console.log(`${Date.now() - start}ms`, 'Password 4 Done');
    });
});

// Top-level code runs immediately on the call stack
// Executes before any async callbacks
console.log('Hello from top level code');


/*
    -------------------
    --Expected Output--
    -------------------
    Hello from top level code
    Timer 1
    Immediate fn 1
    IO Polling Finish
    ----------------------
    ----After Sometime----
    ----------------------
    CPU blocking finished
    Immediate fn 2
    Timer 2
    7549ms Password 3 Done
    7552ms Password 2 Done
    7730ms Password 4 Done
    7783ms Password 1 Done
    Timer 3

*/