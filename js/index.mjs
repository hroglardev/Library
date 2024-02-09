'use strict'

import { validateInputs } from './validation.mjs'

const myLibrary = []

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'Read', 0)
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 320, 'Read', 1)
const book3 = new Book('1984', 'George Orwell', 250, 'Read', 2)
myLibrary.push(book1, book2, book3)

const gridOfBooks = document.querySelector('.card-container')
const aside = document.querySelector('.aside')
const newBook = document.querySelector('.new-book')

const model = {
  title: '',
  author: '',
  pages: 0
}

function Book(title, author, pages, isRead, position) {
  this.title = title
  this.author = author
  this.pages = pages
  this['is-read'] = isRead ? 'Read' : 'Not read'
  this.index = position
  this.info = () => `${this.title} by ${this.author}, ${this.pages}, ${this['is-read']}`
}
const appendItems = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child)
  })
}
const changeTheme = (rootElement) => {
  const currentTheme = rootElement.getAttribute('theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  rootElement.setAttribute('theme', newTheme)
}

const addTextToCard = (bookElements, book) => {
  for (const property in bookElements) {
    if (bookElements[property].nodeName !== 'DIV') {
      bookElements[property].classList.add(property)
      bookElements[property].innerText = `${property[0].toUpperCase()}${property.slice(1).toLowerCase().replace('-', ' ')}: ${book[property]}`
    } else {
      bookElements[property].classList.add(`buttons-${property}`)
    }
  }
}
const addBooktoLibrary = (title, author, pages, isRead, library) => {
  let length = library.length
  let book = new Book(title, author, pages, isRead, length)
  library.push(book)
  displayBooks()
}

const createBook = () => {
  const inputValues = {
    title: document.querySelector('#title').value,
    author: document.querySelector('#author').value,
    pages: document.querySelector('#pages').value
  }
  const errors = validateInputs(inputValues)
  const hasErrors = Object.keys(errors).length
  if (hasErrors === 0) {
    const book = {
      title: inputValues.title,
      author: inputValues.author,
      pages: Number(inputValues.pages),
      'is-read': document.querySelector('#is-read').checked
    }
    addBooktoLibrary(book.title, book.author, book.pages, book['is-read'], myLibrary)
  } else {
    hasErrors.forEach((error) => {
      const paragraphError = document.createElement('p')
    })
  }
}

const displayBooks = () => {
  gridOfBooks.innerHTML = ''
  myLibrary.forEach((book, index) => {
    let card = document.createElement('article')
    card.classList.add('card')
    gridOfBooks.appendChild(card)

    let bookElements = {
      title: document.createElement('h3'),
      author: document.createElement('p'),
      pages: document.createElement('p'),
      'is-read': document.createElement('p'),
      div: document.createElement('div')
    }

    let buttons = {
      remove: document.createElement('button'),
      'toggle-read': document.createElement('button')
    }

    buttons.remove.innerText = 'Remove'
    buttons['toggle-read'].innerText = 'Read or not'

    addTextToCard(bookElements, book)
    appendItems(card, bookElements.title, bookElements.author, bookElements.pages, bookElements['is-read'], bookElements.div)
    appendItems(bookElements.div, buttons.remove, buttons['toggle-read'])

    buttons.remove.addEventListener('click', () => {
      removeBook(index)
    })
    buttons['toggle-read'].addEventListener('click', () => {
      toggleIsRead(index)
    })
  })
}

displayBooks()

const removeBook = (index) => {
  gridOfBooks.removeChild(gridOfBooks.children[index])
  myLibrary.splice(index, 1)
  displayBooks()
}

const toggleIsRead = (index) => {
  myLibrary[index]['is-read'] = myLibrary[index]['is-read'] === 'Read' ? 'Not read' : 'Read'
  displayBooks()
}

const addForm = () => {
  if (document.querySelector('form')) {
    return
  } else {
    const form = document.createElement('form')
    aside.appendChild(form)
    for (const property in model) {
      const label = document.createElement('label')
      const input = document.createElement('input')

      form.appendChild(label)
      form.appendChild(input)

      label.innerText = `${property[0].toUpperCase()}${property.slice(1).toLowerCase().replace('-', ' ')}`
      label.setAttribute('for', property)
      input.id = property
      input.name = property
      input.type = 'text'
    }

    const label = document.createElement('label')
    const input = document.createElement('input')
    const button = document.createElement('button')
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(button)
    label.setAttribute('for', 'is-read')
    label.innerText = 'Have you read it?'
    input.id = 'is-read'
    input.name = 'is-read'
    input.type = 'checkbox'
    button.innerText = 'Submit'
    button.type = 'submit'

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      createBook()
      form.reset()
    })
  }
}

newBook.addEventListener('click', addForm)

const theme = document.querySelector('.theme')
theme.addEventListener('click', () => changeTheme(document.querySelector(':root')))
