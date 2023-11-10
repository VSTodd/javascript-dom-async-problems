/*
- Within the event callback, to check whether or not the correct key was
  pressed, we would check a property on the event object that is passed in
- The key property will tell you which key was pressed
- This is where your previously stored character comes in.
- Check to see if the key property is different than the saved character, and if
  so stop the event from processing further by using a return statement like this:
*/
$(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let $key = $('#key').val();

    $(document).off('keypress').on('keypress', function(event) {
      if (event.key !== $key) {
        return;
      }

      $('a').trigger('click');
    });
  });

  $('a').on('click', function(event) {
    event.preventDefault;
    $('#accordion').slideToggle();
  })
})
