document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  });

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
  });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then(response => response.json())
      .then(comment => {
        let comment_list = document.querySelector("#comments ul");
        comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: comment }));
    });
  }

// Step 3:

  let prevAnchor = document.querySelector('.prev');
  let nextAnchor = document.querySelector('.next');

  prevAnchor.addEventListener('click', event => {
    event.preventDefault();
    let currentPhoto = (document.querySelector('.show') || document.querySelector('#slides figure'));
    let photoID = prevID(currentPhoto);
    processAnchor(currentPhoto, photoID);
  })


  nextAnchor.addEventListener('click', event => {
    event.preventDefault();
    let currentPhoto = (document.querySelector('.show') || document.querySelector('#slides figure'));
    let photoID = nextID(currentPhoto);
    processAnchor(currentPhoto, photoID);
  })

  function processAnchor(photo, id) {
    let nextPhoto = document.querySelector(`[data-id='${id}']`);
    hide(photo);
    show(nextPhoto);
    removeInfoAndComments();
    renderPhotoInformation(id);
    getCommentsFor(id);
  }

  function removeInfoAndComments() {
    document.querySelector("section > header").innerHTML = '';
    document.querySelector("#comments ul").innerHTML = '';
  }

  function nextID(node) {
    let id = Number(node.dataset.id);
    return (id === photos.length ? '1' : Number(id + 1));
  }

  function prevID(node) {
    let id = Number(node.dataset.id);
    return (id === 1 ? Number(photos.length) : Number(id - 1));
  }

  function show(node) {
    node.classList.remove('hide');
    node.classList.add('show');
  }

  function hide(node) {
    node.classList.remove('show');
    node.classList.add('hide');
  }

  //Step 4:
  document.querySelector('section > header').addEventListener('click', event => {
    event.preventDefault();
    let button = event.target;
    let buttonType = button.dataset.property;
    if (buttonType) {
      let url = button.getAttribute('href');
      let buttonID = button.dataset.id;
      let buttonText = button.textContent;

      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `photo_id=${buttonID}`,
      })
      .then(response => response.json())
      .then(json => {
        console.log(json)
        button.textContent = buttonText.replace(/\d+/, json.total);
        fetch("/photos")
        .then(response => response.json())
        .then(json => photos = json);
    });
    }
  })

    // Step 5
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let url = form.getAttribute('action');
    let data = new FormData(form);
    let currentPhotoID = (document.querySelector('.show') || document.querySelector('#slides figure')).dataset.id;
    data.set('photo_id', currentPhotoID);

    fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: new URLSearchParams([...data]),
    })
    .then(response => response.json())
    .then(json => {
      let commentsList = document.querySelector('#comments ul');
      commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
      form.reset();
    });

  })
});

