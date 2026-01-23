console.log("synchronous 1"); // synchronous code executes immediately on the call stack


// microtask scheduled inside a macrotask
setTimeout(() => {
    console.log("setTimeout 1");
    Promise.resolve().then(() => {
        console.log("Promise 1");
    });
}, 0);

console.log("synchronous 2"); // sync code

// macrotask scheduled inside a microtask
Promise.resolve().then(() => {
        setTimeout(() => {
            console.log("setTimeout 2");
        }, 0)
        console.log("Promise 2");
});

console.log("synchronous 3"); // sync code


 /* 
    Expected Output

    synchronous 1
    synchronous 2
    synchronous 3
    Promise 2
    setTimeout 1
    Promise 1
    setTimeout 2

 */