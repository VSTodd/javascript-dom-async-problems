/*
Implement a function that retrieves all the schedules that are available
  - If one or more schedules are available, tally the count of schedules for
    each staff and alert the user of result as "key: value" pairs with the
    staff id as key (in the format of 'staff {id}'; e.g, 'staff 1') and the
    count of schedules as the value
  - If there are no schedules, alert the user that there are currently no
    schedules available for booking.

When implementing the function, keep in mind that the server has been known
  to slow down when there are more than 7 schedules to retrieve. It doesn't
  always happen, but be sure to handle it accordingly
  - Once 5 seconds have passed, cancel the retrieval and inform the user to try again.

- Finally, inform the user about the completion of the request regardless of the
  success or failure (timeout) of the request.
*/



function retrieveStaffSchedules() {
  function tally(arr) {
    arr.forEach(sched => {
      let currentStaff = 'staff ' + sched.staff_id;
      if (staffTally[currentStaff]) {
        staffTally[currentStaff] += 1;
      } else {
        staffTally[currentStaff] = 1;
      }
    })
  }

  let request = new XMLHttpRequest();
  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';
  let staffTally = {};

  request.addEventListener('load', event => {
    let request = event.target;
    if (request) {
      tally(request.response);
      alert(JSON.stringify(staffTally));
    } else {
      alert('There are currently no schedules available for booking');
    }
  })

  request.addEventListener('timeout', event => {
    alert('There was an issue with the server, please try again.');
  })

  request.addEventListener('loadend', event => {
    alert('The request has been completed.');
  })

  request.send();
}

retrieveStaffSchedules();