import { displayBooks, myLibrary } from './index.mjs'

export function Book(title, author, pages, isRead, position) {
  this.title = title
  this.author = author
  this.pages = pages
  this['is-read'] = isRead ? 'Read' : 'Not read'
  this.index = position
  this.info = () => `${this.title} by ${this.author}, ${this.pages}, ${this['is-read']}`
}

const addBooktoLibrary = (title, author, pages, isRead, library, displayBooks) => {
  let length = library.length
  let book = new Book(title, author, pages, isRead, length)
  library.push(book)
  displayBooks()
}

export const createBook = () => {
  const book = {
    title: document.querySelector('#title').value,
    author: document.querySelector('#author').value,
    pages: Number(document.querySelector('#pages').value),
    'is-read': document.querySelector('#is-read').checked
  }

  addBooktoLibrary(book.title, book.author, book.pages, book['is-read'], myLibrary, displayBooks)
}

export const removeBook = (index, gridOfBooks, displayBooks) => {
  gridOfBooks.removeChild(gridOfBooks.children[index])
  myLibrary.splice(index, 1)
  displayBooks()
}
