'use strict'

import { changeTheme } from './changeTheme.mjs'
import { Book } from './book.mjs'
import { createCard } from './domFunctions.mjs'
import { addForm } from './formFunctions.mjs'

export const myLibrary = []

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'Read', 0)
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 320, 'Read', 1)
const book3 = new Book('1984', 'George Orwell', 250, 'Read', 2)
myLibrary.push(book1, book2, book3)

const theme = document.querySelector('.theme')
const gridOfBooks = document.querySelector('.card-container')
const aside = document.querySelector('.aside')
const openForm = document.querySelector('.new-book')

theme.addEventListener('click', () => changeTheme(document.querySelector(':root')))

export const displayBooks = () => {
  gridOfBooks.innerHTML = ''
  myLibrary.forEach((book, index) => createCard(book, index, gridOfBooks))
}

displayBooks()

openForm.addEventListener('click', () => addForm(aside))
