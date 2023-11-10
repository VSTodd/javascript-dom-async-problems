const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

document.addEventListener('DOMContentLoaded', event => {
  let all = document.querySelector('.languages');

  languages.forEach(language => {
    let div = document.createElement('div');
    div.classList.add('less');
    let title = document.createElement('h2');
    let shortContent = document.createElement('p');
    let fullContent = document.createElement('p');
    fullContent.classList.add('hidden');
    let button = document.createElement('button');

    title.textContent = language.name;
    fullContent.textContent = language.description;
    shortContent.textContent = language.description.slice(0, 120) + ' ...';
    button.textContent = "Show More";
    div.appendChild(title);
    div.appendChild(shortContent);
    div.appendChild(fullContent)
    div.appendChild(button);
    all.appendChild(div);
  });

  let buttons = Array.from(document.querySelectorAll('button'));

  buttons.forEach(button => {
    button.addEventListener('click', event => {
      if (button.textContent === "Show More") {
        button.textContent = "Show Less"
      } else {
        button.textContent = "Show More"
      }

    button.previousElementSibling.classList.toggle('hidden');
    button.previousElementSibling.previousElementSibling.classList.toggle('hidden');
    });
  });

})
