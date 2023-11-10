document.addEventListener('DOMContentLoaded', event => {
  const apples = document.querySelector('#apples');
  const message = document.querySelector('#message');
  const replay = document.querySelector('#replay');
  const letters = document.querySelector('#spaces');
  const guesses = document.querySelector('#guesses');

  let randomWord = function() {
    const words = ['lavender', 'dinosaur', 'vampire', 'nachos', 'sword'];

    return function() {
      let index = Math.floor(Math.random() * (words.length));
      let word = words[index];
      words.splice(index, 1);
      return word;
    };
  }();

  class Game {
    constructor() {
      this.word = randomWord();
      this.bind();
      this.wrongGuesses = 0;
      this.guesses = 6;
      this.correctLetters = 0;
      this.lettersGuessed = [];

      if (!this.word) {
        this.displayMessage('Sorry, there are no other words to find!');
        return this;
      }

      this.word = this.word.split('');
      this.createBlanks();
      this.clearGuesses();
      this.displayMessage('');
    }

    addGuess(letter) {
      this.lettersGuessed.push(letter);
      let letterHTML = `<span>${letter}</span>`;
      guesses.insertAdjacentHTML('beforeend', letterHTML);
    }

    bind() {
      this.listener = (event) => this.processGuess(event);
      document.addEventListener('keydown', this.listener);
    }

    unbind() {
      document.removeEventListener('keydown', this.listener);
    }

    checkGameStatus() {
      document.body.classList.remove('win', 'lose');
      if (this.guesses === this.wrongGuesses) {
        this.displayMessage('Sorry, you lost!')
        document.body.classList.add('lose');
        this.unbind();
      } else if (this.word.length === this.correctLetters) {
        document.body.classList.add('win');
        this.displayMessage('Congrats, you found the word!');
        this.unbind();
      }
    }

    clearGuesses() {
      let currentGuesses = guesses.querySelectorAll('#guesses span');
      currentGuesses.forEach(span => span.parentNode.removeChild(span));
    }

    createBlanks() {
      let spaces = [];
      for (let index = 0; index < this.word.length; index++) {
        spaces.push('<span></span>');
      }

      let currentSpans = letters.querySelectorAll('#spaces span');
      currentSpans.forEach(span => span.parentNode.removeChild(span));

      letters.insertAdjacentHTML('beforeend', spaces.join(''));
      this.spaces = document.querySelectorAll('#spaces span');
    }

    displayMessage(text) {
      message.textContent = text;
    }

    invalidKey(letter) {
      let aKeyCode = 97;
      let zKeyCode = 122;
      let letterCode = letter.charCodeAt(0);
      if (letterCode < aKeyCode || letterCode > zKeyCode) {
        return true;
      }
      return this.lettersGuessed.includes(letter);
    }

    processGuess(event) {
      let letter = event.key;

      if (this.invalidKey(letter)) return;
      if (this.word.includes(letter)) {
        this.word.forEach((char, index) => {
          if (char === letter) {
            this.spaces.item(index).textContent = letter;
            this.correctLetters += 1;
          }
        });
      } else {
        this.wrongGuesses += 1;
        this.updateApples();
      }
      this.addGuess(letter);
      this.checkGameStatus();
    }

    updateApples() {
      apples.classList.add(`guess_${this.wrongGuesses}`)
    }
  };
  new Game();

  replay.addEventListener("click", function(event) {
    event.preventDefault();
    new Game();
  });
});

