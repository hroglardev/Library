'use strict'

import { changeTheme } from './changeTheme.mjs'
import { validateInput } from './validation.mjs'
import { Book } from './book.mjs'
import { createCard } from './domFunctions.mjs'
import { createBook, removeBook } from './manipulateLibrary.mjs'
import { isFormValid, addErrorEvent } from './formFunctions.mjs'

export const myLibrary = []
const model = {
  title: '',
  author: '',
  pages: 0
}

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'Read', 0)
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 320, 'Read', 1)
const book3 = new Book('1984', 'George Orwell', 250, 'Read', 2)
myLibrary.push(book1, book2, book3)

const theme = document.querySelector('.theme')
const gridOfBooks = document.querySelector('.card-container')
const aside = document.querySelector('.aside')
const openForm = document.querySelector('.new-book')
let inputs = Array.from(document.querySelectorAll("input[type='text']"))

theme.addEventListener('click', () => changeTheme(document.querySelector(':root')))

export const displayBooks = () => {
  gridOfBooks.innerHTML = ''
  myLibrary.forEach((book, index) => createCard(book, index, gridOfBooks))
}

displayBooks()

const addForm = () => {
  if (document.querySelector('form')) {
    return
  } else {
    const form = document.createElement('form')
    aside.appendChild(form)
    for (const property in model) {
      const label = document.createElement('label')
      const input = document.createElement('input')
      const errorParagraph = document.createElement('p')

      form.appendChild(label)
      form.appendChild(input)

      label.innerText = `${property[0].toUpperCase()}${property.slice(1).toLowerCase().replace('-', ' ')}`
      label.setAttribute('for', property)
      input.id = property

      input.name = property
      input.type = 'text'

      errorParagraph.classList.add(`error-${property}`)
      form.appendChild(errorParagraph)

      addErrorEvent(input, errorParagraph, () => validateInput(input))
    }
    const div = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const button = document.createElement('button')

    form.appendChild(div)
    div.appendChild(label)
    div.appendChild(input)
    form.appendChild(button)
    label.setAttribute('for', 'is-read')
    label.innerText = 'Have you read it?'
    input.id = 'is-read'
    input.name = 'is-read'
    input.type = 'checkbox'
    button.innerText = 'Create'
    button.type = 'submit'
    button.setAttribute('disabled', true)

    inputs = Array.from(document.querySelectorAll("input[type='text']"))

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      createBook()
      form.reset()
      button.setAttribute('disabled', true)
    })

    form.addEventListener('input', (_event) => {
      let isValid = isFormValid(inputs)
      if (isValid) {
        button.removeAttribute('disabled')
      }
    })
  }
}

openForm.addEventListener('click', addForm)
