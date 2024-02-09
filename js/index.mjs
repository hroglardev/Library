'use strict'
import { changeTheme } from './changeTheme.mjs'
const myLibrary = []

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

const addBooktoLibrary = (title, author, pages, isRead) => {
  let length = myLibrary.length
  let book = new Book(title, author, pages, isRead, length)
  myLibrary.push(book)
  displayBooks()
}

const appendItems = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child)
  })
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

// DUMMY CONTENT
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'Read', 0)
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 320, 'Read', 1)
const book3 = new Book('1984', 'George Orwell', 250, 'Read', 2)
const book4 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'Read', 0)
const book5 = new Book('To Kill a Mockingbird', 'Harper Lee', 320, 'Read', 1)
const book6 = new Book('1984', 'George Orwell', 250, 'Read', 2)

myLibrary.push(book1, book2, book3, book4, book5, book6)
// DUMMY CONTENT END

const gridOfBooks = document.querySelector('.card-container')

const displayBooks = () => {
  myLibrary.forEach((book) => {
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
    buttons['toggle-read'].innerText = 'Read it'

    addTextToCard(bookElements, book)
    appendItems(card, bookElements.title, bookElements.author, bookElements.pages, bookElements['is-read'], bookElements.div)
    appendItems(bookElements.div, buttons.remove, buttons['toggle-read'])
  })
}

displayBooks()

const aside = document.querySelector('.aside')
const newBook = document.querySelector('.new-book')

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

const createBook = () => {
  const book = {
    title: document.querySelector('#title').value,
    author: document.querySelector('#author').value,
    pages: Number(document.querySelector('#pages').value),
    'is-read': document.querySelector('#is-read').checked
  }

  addBooktoLibrary(book.title, book.author, book.pages, book['is-read'])
}

const theme = document.querySelector('.theme')
theme.addEventListener('click', () => changeTheme(document.querySelector(':root')))
const removeBook = (book) => {}

const toggleIsRead = () => {}
