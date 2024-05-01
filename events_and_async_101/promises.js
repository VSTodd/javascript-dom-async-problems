//1 
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Launch School", 2000));
});

promise.then((value) => {
  console.log(value);
});

//2 

let failedPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject("Error: Not Launch School", 2000));
});

failedPromise.catch(function(value) {
  console.log(value);
});


