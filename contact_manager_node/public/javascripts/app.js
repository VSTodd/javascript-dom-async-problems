class Model {
  constructor() {
    this.tags = {tagName: ['work', 'school', 'friend']};
  }

  addTag(tag) {
    this.tags.tagName.push(tag);
  }

  async fetchContacts() {
    let response = await fetch('/api/contacts');
    return await response.json();
  }

  async fetchContact(id) {
    let response = await fetch(`/api/contacts/${id}`);
    return await response.json();
  }

  async addNewCont(name, email, phone, tags) {
    let data = { 'full_name': name, 'email': email, 'phone_number': phone, 'tags': tags };
    let badData = 'hello';
    try {
      let response = await fetch('/api/contacts/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.status === 201 ? 'success' : 'error';
    } catch (error) {
      return 'error';
    }
  }

  async editCont(id, name, email, phone, tags) {
    let data = { 'id': id, 'full_name': name, 'email': email, 'phone_number': phone, 'tags': tags };
    let badData = 'hello';
    try {
      let response = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.status === 201 ? 'success' : 'error';
    } catch (error) {
      return 'error';
    }
  }

  async deleteCont(id) {
    try {
      let response = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.status === 204 ? 'success' : 'error';
    } catch (error) {
      return 'error';
    }
  }

  validTag(tag) {
    tag = tag.trim();
    if (tag.length < 1 || tag.length > 15) return false;
    return (tag.split(' ').length === 1 && !this.tags.tagName.includes(tag.toLowerCase()));
  }
}

class View {
  constructor() {
    this.mainPage = document.querySelector('#mainPage');
    this.tagPage = document.querySelector('#tagPage');
    this.newContPage = document.querySelector('#newContPage');
    this.editContPage = document.querySelector('#editContPage');
  }

  changeView(view) {
    switch (view) {
      case 'main':
        this.mainPage.style.display = 'block';
        this.newContPage.style.display = 'none';
        this.tagPage.style.display = 'none';
        this.editContPage.style.display = 'none';
        break;
      case 'tag':
        this.mainPage.style.display = 'none';
        this.newContPage.style.display = 'none';
        this.tagPage.style.display = 'block';
        this.editContPage.style.display = 'none';
        break;
      case 'newCont':
        this.mainPage.style.display = 'none';
        this.newContPage.style.display = 'block';
        this.tagPage.style.display = 'none';
        this.editContPage.style.display = 'none';
        break;
      case 'editCont':
        this.mainPage.style.display = 'none';
        this.newContPage.style.display = 'none';
        this.tagPage.style.display = 'none';
        this.editContPage.style.display = 'block';
        break;
    }
  }

  viewContacts(contacts) {
    Handlebars.registerPartial('contactPartial', document.querySelector('#contactPartial').innerHTML);
    let contactTemplate = Handlebars.compile(document.querySelector('#contactTemplate').innerHTML);
    let contactSpot = document.querySelector('#contactSpot');

    contactSpot.innerHTML = contactTemplate({contact: contacts});
  }

  viewEdit(data, tags) {
    data.checkedTags = this.addCheckedTags(data, tags);
    Handlebars.registerPartial('tagPartial', document.querySelector('#tagPartial').innerHTML);
    Handlebars.registerPartial('checkedTagPartial', document.querySelector('#checkedTagPartial').innerHTML);
    Handlebars.registerPartial('uncheckedTagPartial', document.querySelector('#uncheckedTagPartial').innerHTML);
    let editTemplate = Handlebars.compile(document.querySelector('#editTemplate').innerHTML);
    let editForm = document.querySelector('#editContForm');

    editForm.innerHTML = editTemplate(data);
  }

  viewTags(tags) {
    Handlebars.registerPartial('tagPartial', document.querySelector('#tagPartial').innerHTML);
    let tagTemplate = Handlebars.compile(document.querySelector('#tagTemplate').innerHTML);
    let tagSpot = document.querySelector('#tagSpot');

    tagSpot.innerHTML = tagTemplate(tags);
  }

  viewTagLinks(tags) {
    Handlebars.registerPartial('tagLinksPartial', document.querySelector('#tagLinksPartial').innerHTML);
    let tagLinksTemplate = Handlebars.compile(document.querySelector('#tagLinksTemplate').innerHTML);
    let tagLinksSpot = document.querySelector('#tagLinksSpot');

    tagLinksSpot.innerHTML = tagLinksTemplate(tags);
  }

  addCheckedTags(data, tags) {
    let checkedTags = data.tags!= null ? data.tags.split(',') : '';
    let tagsArr = [];
    tags.tagName.forEach(tag => {
      let obj = {};
      obj['name'] = tag;
      obj['checked'] = checkedTags.includes(tag);
      tagsArr.push(obj);
    })
    return tagsArr;
  }

  failedSearch(text) {
    let contactSpot = document.querySelector('#contactSpot');
    contactSpot.innerHTML = `<h2>There are no contacts with "${text}"</h2>`;
  }

  failedTag(tag) {
    let contactSpot = document.querySelector('#contactSpot');
    contactSpot.innerHTML = `<h2>There are no contacts with the tag "${tag}"</h2>`;
  }
}

class Controller {
  constructor() {
    this.model = new Model;
    this.view = new View;
    this.loadContacts();
    this.loadTags();
    this.initiateEventHandlers();
  }

  initiateEventHandlers() {
    document.querySelector('#addTag').addEventListener('click', this.handleAddTagButton.bind(this));
    document.querySelector('#addContact').addEventListener('click', this.handleAddContactButton.bind(this));
    document.querySelector('#tagForm').addEventListener('submit', this.handleTagFormSubmit.bind(this));
    document.querySelector('#newContForm').addEventListener('submit', this.handleNewContFormSubmit.bind(this));
    document.querySelector('#editContForm').addEventListener('submit', this.handleEditContFormSubmit.bind(this));
    document.querySelector('#search').addEventListener('keydown', this.handleSearch.bind(this));
    document.addEventListener('click', this.handleButtonClick.bind(this));
  }

  async loadContacts() {
    let contacts = await this.model.fetchContacts();
    this.view.viewContacts(contacts);
  }

  loadTags() {
    this.view.viewTagLinks(this.model.tags);
  }

  handleButtonClick(event) {
    if (event.target.classList.contains('contactEdit')) {
      event.preventDefault();
      this.handleEditContactButton(event);
    }
    else if (event.target.classList.contains('contactDelete')) {
      this.handleDelete(event);
    }
    else if (event.target.classList.contains('back')) {
      this.handleBack();
    } else if (event.target.classList.contains('tagLink')) {
      this.handleTagLink(event);
    }
  }

  handleAddTagButton() {
    this.view.changeView('tag');
  }

  handleAddContactButton() {
    this.view.changeView('newCont');
    this.view.viewTags(this.model.tags);
  }

  async handleEditContactButton(event) {
    let id = event.target.id.replace('edit', '');
    let contact = await this.model.fetchContact(id);

    this.view.viewEdit(contact, this.model.tags);
    this.view.changeView('editCont');
  }

  handleBack() {
    event.preventDefault();
    this.view.changeView('main');
  }

  handleTagFormSubmit() {
    event.preventDefault();
    let form = document.querySelector('#tagForm')
    let tag = new FormData(form).get('tag');
    if (this.model.validTag(tag)) {
      this.model.addTag(tag.toLowerCase());
      this.view.viewTagLinks(this.model.tags);
      this.view.changeView('main');
      form.reset();
      alert('Tag successfully added!');
    } else {
      alert('Invalid tag. It must be unique and between 1 and 15 characters.');
    }
  }

  async handleNewContFormSubmit() {
    event.preventDefault();
    let form = document.querySelector('#newContForm');
    let formData = new FormData(form);
    let name = formData.get('name');
    let email = formData.get('email');
    let phone = formData.get('tel');
    let tags = formData.getAll('tag').length > 0 ? formData.getAll('tag').join(',') : null;

    let response = await(this.model.addNewCont(name, email, phone, tags));

    if (response === 'success') {
      this.loadContacts();
      this.view.changeView('main');
      form.reset();
      alert('Contact successfully added!');
    } else {
      alert('Sorry, contact unable to be added. Please try again.')
    }
  }

  async handleSearch(event) {
    let contacts = await this.model.fetchContacts();
    let text = document.querySelector('#search').value;
    let filteredContacts = contacts.filter(contact => {
      let name = contact.full_name.toLowerCase();
      return name.includes(text.toLowerCase().trim());
    });

    if (filteredContacts.length === 0) {
      this.view.failedSearch(text);
    } else {
      this.view.viewContacts(filteredContacts);
    }
  }

  async handleTagLink(event) {
    let contacts = await this.model.fetchContacts();
    let tag = event.target.textContent;
    let filteredContacts = contacts.filter(contact => {
      if (contact.tags === null) return false;
      let tags = contact.tags.split(',');
      return tags.includes(tag);
    });

    if (filteredContacts.length === 0) {
      this.view.failedTag(tag);
    } else {
      this.view.viewContacts(filteredContacts);
    }
  }

  async handleDelete(event) {
    event.preventDefault();
    let id = Number(event.target.id.replace('delete', ''));
    let response = await(this.model.deleteCont(id));

    if (response === 'success') {
      this.loadContacts();
      alert('Contact successfully deleted!');
    } else {
      alert('Sorry, contact unable to be deleted. Please try again.')
    }
  }

  async handleEditContFormSubmit() {
    event.preventDefault();
    let form = document.querySelector('#editContForm');
    let id = Number(form.querySelector('.submit').id.replace('submit', ''));
    let formData = new FormData(form);
    let name = formData.get('name');
    let email = formData.get('email');
    let phone = formData.get('tel');
    let tags = formData.getAll('tag').length > 0 ? formData.getAll('tag').join(',').replaceAll('/', '') : null;
    let response = await(this.model.editCont(id, name, email, phone, tags));

    if (response === 'success') {
      this.loadContacts();
      this.view.changeView('main');
      form.reset();
      alert('Contact successfully updated!');
    } else {
      alert('Sorry, contact unable to be updated. Please try again.')
    }
  }
}

document.addEventListener('DOMContentLoaded', event => {
  let app = new Controller();
});
