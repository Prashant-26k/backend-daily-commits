console.log("Synchronous 1"); //sync code -> pushed directly to call stack

setTimeout(() => {
    console.log("Macrotask"); // callback scheduled in macrotask queue

}, 0);

console.log("Synchronous 2"); // sync code

Promise.resolve().then(() => {
    console.log("Microtask"); // callback scheduled in microtask queue

});


(async function () {
  console.log("async start"); // sync code
  await Promise.resolve();
  console.log("async end"); // callback scheduled in microtask queue

})();

console.log("Synchronous 3"); // sync code


/* Expected output

    Synchronous 1
    Synchronous 2
    async start 
    Synchronous 3
    Microtask
    async end
    Macrotask

*/
