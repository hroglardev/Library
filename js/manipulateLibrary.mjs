import { displayBooks, myLibrary } from './index.mjs'
import { Book } from './book.mjs'

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
