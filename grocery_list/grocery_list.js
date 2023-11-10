document.addEventListener('DOMContentLoaded', event => {
  let form = document.querySelector('form');
  let list = document.querySelector('#grocery-list');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let item = document.querySelector('#name').value;
    let quantity = document.querySelector('#quantity').value;
    if (quantity === '') quantity = '1';

    let listItem = document.createElement('li');
    listItem.textContent = quantity + ' ' + item;

    list.appendChild(listItem);
    form.reset();
  });
})
