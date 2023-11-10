function makeBold(selection, callback = null) {
  selection.style.fontWeight = 'bold';
  if (callback) {
    callback(selection);
  }
}

let sectionElement = document.querySelector('section');
makeBold(sectionElement, function(elem) {
  elem.classList.add('highlight');
});

sectionElement.classList.contains('highlight'); // = true
sectionElement.style.fontWeight; // = "bold"