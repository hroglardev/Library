'use strict'

const myLibrary = []

function Book(title, author, pages, isRead = 'Not read', position) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
  this.index = position
  this.info = () => `${title} by ${author}, ${pages}, ${isRead} `
}

const addBooktoLibrary = (title, author, pages, isRead) => {
  let length = myLibrary.length
  let book = new Book(title, author, pages, isRead, length)
  myLibrary.push(book)
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
      bookElements[property].innerText = `${property[0].toUpperCase()}${property.slice(1).toLowerCase()}: ${book[property]}`
    }
  }
}
// DUMMY CONTENT
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'Read', 0)
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 320, 'Read', 1)
const book3 = new Book('1984', 'George Orwell', 250, 'Read', 2)

myLibrary.push(book1, book2, book3)

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
      isRead: document.createElement('p'),
      div: document.createElement('div')
    }
    let buttons = {
      remove: document.createElement('button'),
      toggle: document.createElement('button')
    }

    addTextToCard(bookElements, book)
    appendItems(card, bookElements.title, bookElements.author, bookElements.pages, bookElements.isRead, bookElements.div)
    appendItems(bookElements.div, buttons.remove, buttons.toggle)
  })
}

displayBooks()

// const poppingFormButton = document.querySelector('.new-book')
// poppingFormButton.addEventListener('click')
