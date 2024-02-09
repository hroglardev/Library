import { removeBook } from './manipulateLibrary.mjs'
import { myLibrary, displayBooks } from './index.mjs'

export const appendItems = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child)
  })
}

export const addTextToCard = (bookElements, book) => {
  for (const property in bookElements) {
    if (bookElements[property].nodeName !== 'DIV' && bookElements[property].nodeName !== 'BUTTON') {
      bookElements[property].classList.add(property)
      bookElements[property].innerText = `${property[0].toUpperCase()}${property.slice(1).toLowerCase().replace('-', ' ')}: ${book[property]}`
    } else {
      bookElements[property].classList.add(`buttons-${property}`)
    }
  }
}

export const toggleIsRead = (index, library) => {
  library[index]['is-read'] = library[index]['is-read'] === 'Read' ? 'Not read' : 'Read'
  displayBooks()
}

export const addTextToElement = (element, text) => {
  element.innerText = text
}

export const createHtmlElement = (elementType, className) => {
  const element = document.createElement(elementType)
  if (className) {
    element.classList.add(className)
  }
  return element
}

export const createCard = (book, index, gridOfBooks) => {
  const card = createHtmlElement('article', 'card')
  card.classList.add('card')
  gridOfBooks.appendChild(card)

  const cardElements = {
    title: createHtmlElement('h3'),
    author: createHtmlElement('p'),
    pages: createHtmlElement('p'),
    'is-read': createHtmlElement('p'),
    div: createHtmlElement('div'),
    remove: createHtmlElement('button'),
    'toggle-read': createHtmlElement('button')
  }

  addTextToElement(cardElements.remove, 'Remove')
  addTextToElement(cardElements['toggle-read'], 'Read or not')
  addTextToCard(cardElements, book)

  appendItems(card, cardElements.title, cardElements.author, cardElements.pages, cardElements['is-read'], cardElements.div)
  appendItems(cardElements.div, cardElements.remove, cardElements['toggle-read'])

  cardElements.remove.addEventListener('click', () => removeBook(index, displayBooks))
  cardElements['toggle-read'].addEventListener('click', () => toggleIsRead(index, myLibrary))
}
