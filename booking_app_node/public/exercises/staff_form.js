/*
- Implement a form for adding new staff, and then use the booking app API to add
  the staff to the database
- Your implementation should handle the different possible responses of the
  server and inform the user of the outcome.
*/

function submitStaffForm() {
  document.addEventListener('DOMContentLoaded', () => {
    let request = new XMLHttpRequest;
    let form = document.querySelector('form');

    form.addEventListener('submit', event => {
      event.preventDefault();
      let data = new FormData(form);

      let object = {};
      data.forEach((value, key) => object[key] = value);
      let json = JSON.stringify(object);

      request.open('POST', form.action);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(json);

      request.addEventListener('load', event => {
        if (request.status === 201) {
          let responseData = JSON.parse(request.response);
          alert(`Successfully created staff with id: ${responseData.id}`);
          form.reset();
        } else if (request.status === 400) {
          alert(request.responseText);
        }
      })
    });
  });
}

submitStaffForm();