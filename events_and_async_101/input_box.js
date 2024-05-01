document.addEventListener('DOMContentLoaded', () => {
  let cursor;
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');
  textField.addEventListener('click', event => {
    event.stopPropagation();
    if (!textField.classList.contains('focused')) {
    textField.classList.add('focused')
    cursor = setInterval(() => textField.classList.toggle('cursor'), 500);
    }
  });

  document.addEventListener('click', () => {
    clearInterval(cursor);
    if (textField.classList.contains('focused')) {
      textField.classList.remove('focused');
      textField.classList.remove('cursor');
    }
  });

  document.addEventListener('keydown', event => {
    if (textField.classList.contains('focused')) {
      if (event.key === 'Backspace') {
       content.textContent = content.textContent.slice(0, content.textContent.length - 1)
      } else {
        content.textContent += event.key;
      }
    }
  });
});
