let todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Walk the dog'},
  { id: 5, title: 'Feed the lizard'},
  { id: 6, title: 'Finish Core'}
];

document.addEventListener("DOMContentLoaded", event => {
  let todos = document.querySelector('.todos');
  let dialog = document.querySelector('dialog');
  let currentID;

  todo_items.forEach (todo => {
    let newTodo = document.createElement('li');
    newTodo.textContent = todo.title + '  ';
    newTodo.id = todo.id;

    let x = document.createElement('button');
    x.classList.add('delete');
    x.textContent = 'X';
    newTodo.appendChild(x);
    todos.appendChild(newTodo);
  });

  let buttons = Array.from(document.querySelectorAll('.delete'));
  buttons.forEach(button => {
    button.addEventListener('click', event => {
      dialog.showModal();
      currentID = event.target.parentNode.id;
    })
  })

  let yes = document.querySelector('#yes');
  let no = document.querySelector('#no');

  yes.addEventListener('click', event => {
    dialog.close();
    document.querySelector(`#${CSS.escape(currentID)}`).remove();
    currentID = null;
  })

  no.addEventListener('click', event => {
    dialog.close();
  })
})