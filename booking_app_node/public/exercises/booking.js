function getTimeSlots() {
  let requestSched = new XMLHttpRequest();
  requestSched.open('GET', '/api/schedules');
  requestSched.responseType = 'json';

  let requestStaff = new XMLHttpRequest();
  requestStaff.open('GET', '/api/staff_members');
  requestStaff.responseType = 'json';

  requestSched.addEventListener('load', eventSched => {
    requestStaff.addEventListener('load', eventStaff => {
      let request = eventSched.target;
      let slots = request.response;
      let staff = eventStaff.target.response;
      let select = document.querySelector('select');

      slots.forEach(slot => {
        let name = staff.filter(member => member.id === slot.staff_id)
        if (!slot.student_email && name.length > 0) {
          let option = document.createElement('option');

          option.value = slot.id;
          option.innerHTML = `${name[0].name} | ${slot.date} | ${slot.time}`
          select.appendChild(option);
        }
      });
    });
  });

  requestSched.send();
  requestStaff.send();
}

getTimeSlots();

let requestStudents = new XMLHttpRequest();
requestStudents.open('GET', '/api/schedules');
requestStudents.responseType = 'json';
requestStudents.send();

/*
let submit = document.querySelector('#submit');
submit.addEventListener('click', event => {
  alert('submit');
})
*/