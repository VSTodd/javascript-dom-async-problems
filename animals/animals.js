document.addEventListener('DOMContentLoaded', event => {
  let figures = Array.from(document.querySelectorAll('figure'));
  figures.forEach (figure => {
    figure.addEventListener('mouseenter', event => {
      setTimeout(() => {
        let caption = event.target.lastElementChild;
        caption.style.display = 'inline';
      }, 2000);
    });

    figure.addEventListener('mouseleave', event => {
      setTimeout(() => {
        let caption = event.target.lastElementChild;
        caption.style.display = 'none';
      }, 2000);
    });
  })

});
