/*
- Write a JavaScript function named delayLog that loops through the numbers
  from 1 to 10, and logs each number after that number of seconds
- It should log 1 after 1 second, 2 after 2 seconds, etc
  - Note that the computation of the time is not dependent on when a previous
    number was logged
  - This means that for 10 numbers a total of 10 seconds would have passed.
  */

  function delayLog() {
    for (let counter = 1; counter <= 10; counter++) {
      setTimeout(() => {
        console.log(counter)
      }, (counter * 1000));
    }
  }

  delayLog();

// 2
setTimeout(() => {      // 1
  console.log('Once');  // 5
}, 1000);

setTimeout(() => {      // 2
  console.log('upon');  // 7
}, 3000);

setTimeout(() => {      // 3
  console.log('a');     // 6
}, 2000);

setTimeout(() => {      // 4
  console.log('time');  // 8
}, 4000);

// 3
setTimeout(() => { // 1
  setTimeout(() => { // 7
    q(); // 13
  }, 15);

  d(); // 8

  setTimeout(() => { // 9
    n(); // 11
  }, 5);

  z(); // 10
}, 10);

setTimeout(() => { // 2
  s(); // 12
}, 20);

setTimeout(() => { // 3
  f(); // 5
});

g(); // 4

// g, f, d, z, n, q, s

//// 4
/*
- Write a function named afterNSeconds that takes two arguments:
  a callback and a time duration in seconds
- The function should wait for the indicated period, then invoke the callback
  function
*/


function afterNSeconds(callback, delay) {
  setTimeout(callback, delay * 1000);
}