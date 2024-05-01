// Write a function named startCounting that logs a number to the console every
// second, starting with 1
// Each number should be one greater than the previous number.

let counter;

function startCounting() {
  let num = 0;
  counter = setInterval(() => {
    num += 1;
    console.log(num);
  }, 1000);
}

function stopCounting() {
  clearInterval(counter)
}