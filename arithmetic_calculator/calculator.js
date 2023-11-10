document.addEventListener('DOMContentLoaded', event => {
  let submit = document.querySelector('input[type="submit"]');
  let result = document.querySelector('#result');

  submit.addEventListener('click', event => {
    event.preventDefault();
    let num1 = parseInt(document.querySelector('#first-number').value, 10);
    let num2 = parseInt(document.querySelector('#second-number').value, 10);
    let select = document.querySelector('#operator');
    let operator = select.options[select.selectedIndex].text;
    let total;

    switch(operator) {
      case '+':
        total = num1 + num2;
        break;
      case '-':
        total = num1 - num2;
        break;
      case '*':
        total = num1 * num2;
        break;
      case '/':
        total = num1 / num2;
        break;
    }

    result.textContent = total;
  })
})