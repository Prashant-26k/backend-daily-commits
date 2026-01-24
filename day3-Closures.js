function createCounter() {
    const bigData = new Array(1_000_000); // Large Unused data
    let valueOne = 10; // private variable i.e cannot be accessed outside createCounter function

    return {

        increment() {
            valueOne++
            return valueOne;
        },

        decrement() {
            valueOne--
            return valueOne;
        }
    };
}

const Counter1 = createCounter(); // Counter function is called and stored inside the counter1


console.log(Counter1.increment()); // calling increment outside valuOne's scope
console.log(Counter1.increment()); // again calling increment
console.log(Counter1.decrement()); // calling decrement


/*
    Expected Output
        11
        12
        11

*/