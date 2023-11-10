

const tags = {tagName: ['work', 'school']};

document.addEventListener('DOMContentLoaded', event => {
  let tagButton = document.querySelector('#addTag');
  let contactButton = document.querySelector('#addContact');
  let mainPage = document.querySelector('#mainPage');
  let tagPage = document.querySelector('#tagPage');
  let tagForm = document.querySelector('#tagForm');
  let tagBack = document.querySelector('#backTag');
  let newContPage = document.querySelector('#newContPage');
  let newContBack = document.querySelector('#newContBack');

  contactButton.addEventListener('click', event => {
    mainPage.style.display = 'none';
    newContPage.style.display = 'block';

    Handlebars.registerPartial('tagPartial', document.querySelector('#tagPartial').innerHTML);
    let tagTemplate = Handlebars.compile(document.querySelector('#tagTemplate').innerHTML);
    let tagSpot = document.querySelector('#tagSpot');

    tagSpot.innerHTML = tagTemplate(tags);
  })

  newContBack.addEventListener('click', event => {
    event.preventDefault();
    newContPage.style.display = 'none';
    mainPage.style.display = 'block';
  });

  tagButton.addEventListener('click', event => {
    mainPage.style.display = 'none';
    tagPage.style.display = 'block';
  })

  tagBack.addEventListener('click', event => {
    event.preventDefault();
    tagPage.style.display = 'none';
    mainPage.style.display = 'block';
  });

  tagForm.addEventListener('submit', event => {
    event.preventDefault();
    let tag = new FormData(tagForm).get('tag');
    if (validTag(tag)) {
      tags.tagName.push(tag.toLowerCase());
      tagPage.style.display = 'none';
      mainPage.style.display = 'block';
      tagForm.reset();
      alert('Tag successfully added!');
    } else {
      alert('Invalid tag. It must be unique and between 1 and 15 characters.');
    }
  });
});

function validTag(tag) {
  tag = tag.trim();
  if (tag.length < 1 || tag.length > 15) return false;
  return (tag.split(' ').length === 1 && !tags.tagName.includes(tag.toLowerCase()));
}