let body = document.querySelector('body');
let navHeader = document.querySelector('body > header');
let title = document.querySelector('h1');

navHeader.insertBefore(title, navHeader.querySelector('nav'));
body.insertBefore(navHeader, document.querySelector('main'));

let figures = document.querySelectorAll('figure');
let img1 = figures[0].querySelector('img');
let img2 = figures[1].querySelector('img');

figures[0].insertBefore(img2, figures[0].querySelector('figcaption'));
figures[1].insertBefore(img1, figures[1].querySelector('figcaption'));

let article = document.querySelector('article');

article.insertAdjacentElement('beforeend', figures[0]);
article.insertAdjacentElement('beforeend', figures[1]);
