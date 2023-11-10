document.addEventListener('DOMContentLoaded', () => {
  let answer = Math.floor(Math.random() * 100) + 1;
  let form = document.querySelector('form');
  let input = form.querySelector('#guess');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let guess = parseInt(input.value, 10);
    let message;

    if (guess > answer) {
      message = `My number is lower than ${String(guess)}`;
    } else if (answer < guess) {
      message = `My number is higher than ${String(guess)}`;
    } else {
      message = `You guessed it!`;
    }

    document.querySelector('p').textContent = message;
  });

  let newGame = document.querySelector('a');

  newGame.addEventListener('click', event => {
    event.preventDefault();
    answer = Math.floor(Math.random() * 100) + 1;
    document.querySelector('p').textContent = 'Guess a number between 1 & 100';
  });
});
