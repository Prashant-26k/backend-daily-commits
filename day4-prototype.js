"use strict";


// Constructor Function
function User(name) {
  this.name = name;
}


// Prototype Method (Shared)
User.prototype.greet = function () {
  console.log(`Hello ${this.name}`);
};


// Instances created with `new`
const user1 = new User("Prashant");
const user2 = new User("Prince");

user1.greet(); // Hello Prashant
user2.greet(); // Hello Prince



// Method Borrowing using call()
const person = {
  name: "Borrowed User"
};

// Borrowing prototype method
User.prototype.greet.call(person); // Hello Borrowed User


// this binding difference
// 1. Method call → this = object
user1.greet();

// 2. Explicit binding → this is fixed
const boundGreet = user1.greet.bind(user1);
boundGreet(); // Hello Prashant


// Class version (Same Logic)
class UserClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }
}

const u1 = new UserClass("Class User");
u1.greet(); // Hello Class User
