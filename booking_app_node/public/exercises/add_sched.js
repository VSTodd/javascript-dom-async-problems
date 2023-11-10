function getStaffMembers() {
  let request = new XMLHttpRequest();
  request.open('GET', '/api/staff_members');
  request.responseType = 'json';

  request.addEventListener('load', event => {
    let select = document.querySelector('select');
    let request = event.target;
    let staff = request.response;
    staff.forEach(staffMember => {
      let option = document.createElement('option');
      option.value = staffMember.name;
      option.innerHTML = staffMember.name;
      select.appendChild(option);
    });
  });

  request.send();
}

getStaffMembers();

document.addEventListener('DOMContentLoaded', event => {
  let more = document.getElementById('more');
  let submit = document.getElementById('submit');
  more.addEventListener('click', event => {
    let form = document.querySelector('form');
    let newForm = form.cloneNode(true);
    document.body.insertBefore(newForm, submit);
  });

  submit.addEventListener('click', event => {
    submitForm();
  });
});

function formInputsToJson(data) {
  const json = [];
  let i = 0;
  data.forEach(form => {
    let schedule = {};
     schedule.staff_id = form['name'].value;
     schedule.date = form['date'].value;
     schedule.time = form['time'].value;
     json.push(schedule);
     i += 1;
  })
  return {schedules: json};
}

function submitForm() {
  event.preventDefault();
  let form = document.querySelector('form');
  let data = Array.from(document.querySelectorAll('form'));

  let request = new XMLHttpRequest;
  let json = JSON.stringify(formInputsToJson(data));


  request.open('POST', form.action);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(json);

  request.addEventListener('load', event => {
    if (request.status === 201) {
      form.reset();
    }

    alert(request.responseText);
  });
}