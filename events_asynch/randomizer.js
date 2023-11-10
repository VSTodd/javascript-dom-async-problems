function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(...args) {
  let num = 1;
  let interval = setInterval(() => {
    console.log(num);
    num++
  }, 1000);

  args.forEach(callback => {
    let time = Math.floor(Math.random() * args.length * 1000);
    setTimeout(callback, time);
  });

  setTimeout(() => {clearInterval(interval)}, 1010 * args.length);
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6