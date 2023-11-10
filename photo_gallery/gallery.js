document.addEventListener('DOMContentLoaded', event => {
  let gallery = document.querySelector('figure > img');
  let images = document.querySelectorAll('li > img');

  function clicked(event) {
    let currentImage = document.querySelector('.current');
    if (currentImage) {
      currentImage.classList.remove('current');
    }
    let nextImage = event.target.closest('img');
    nextImage.classList.add('current');
    let url = nextImage.src;
    gallery.src = url;
  };

  images.forEach(image => image.addEventListener('click', clicked));
})