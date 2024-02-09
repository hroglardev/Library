export const appendItems = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child)
  })
}

export const addTextToCard = (bookElements, book) => {
  for (const property in bookElements) {
    if (bookElements[property].nodeName !== 'DIV') {
      bookElements[property].classList.add(property)
      bookElements[property].innerText = `${property[0].toUpperCase()}${property.slice(1).toLowerCase().replace('-', ' ')}: ${book[property]}`
    } else {
      bookElements[property].classList.add(`buttons-${property}`)
    }
  }
}

export const addErrorEvent = (input, error, validationFunction) => {
  input.addEventListener('input', (_event) => {
    error.innerText = validationFunction()

    if (error.innerText !== '') {
      input.classList.add('red-border')
      error.classList.add('red-error')
    } else {
      input.classList.remove('red-border')
    }
  })
}
