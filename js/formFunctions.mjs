import { createHtmlElement } from './domFunctions.mjs'
import { createBook } from './manipulateLibrary.mjs'
import { validateInput } from './validation.mjs'

const model = {
  title: '',
  author: '',
  pages: 0
}

export const isFormValid = (inputs) => {
  return inputs.every((inputElements) => !inputElements.classList.contains('red-border') && inputElements.value !== '')
}

export const addErrorEvent = (input, error, validateFunction) => {
  input.addEventListener('input', (_event) => {
    error.innerText = validateFunction()

    if (error.innerText !== '') {
      input.classList.add('red-border')
      error.classList.add('red-error')
    } else {
      input.classList.remove('red-border')
    }
  })
}

export const handleSubmitForm = (event, formElement, button) => {
  event.preventDefault()
  createBook()
  formElement.reset()
  button.setAttribute('disabled', true)
}

export const handleAllowSubmission = (button, inputs) => {
  let isValid = isFormValid(inputs)
  if (isValid) {
    button.removeAttribute('disabled')
  }
}

export const createFormSection = (parentElement, propertyName, type) => {
  const label = createHtmlElement('label')
  const input = createHtmlElement('input')

  parentElement.appendChild(label)
  parentElement.appendChild(input)

  label.setAttribute('for', propertyName)
  label.innerText = 'Have you read it?'

  input.id = propertyName
  input.name = propertyName
  input.type = type

  if (input.type === 'text') {
    label.innerText = `${propertyName[0].toUpperCase()}${propertyName.slice(1).toLowerCase().replace('-', ' ')}`
    const errorParagraph = createHtmlElement('p', `error${propertyName}`)
    parentElement.appendChild(errorParagraph)
    addErrorEvent(input, errorParagraph, () => validateInput(input))
  }
}

export const addForm = (aside) => {
  if (document.querySelector('form')) {
    return
  } else {
    const form = createHtmlElement('form')
    aside.appendChild(form)
    for (const property in model) {
      createFormSection(form, property, 'text')
    }

    const div = createHtmlElement('div')
    createFormSection(div, 'is-read', 'checkbox')
    const submitButton = createHtmlElement('button')

    form.appendChild(div)
    form.appendChild(submitButton)

    submitButton.innerText = 'Create'
    submitButton.type = 'submit'
    submitButton.setAttribute('disabled', true)

    const inputs = Array.from(document.querySelectorAll("input[type='text']"))

    form.addEventListener('submit', (event) => handleSubmitForm(event, form, submitButton))
    form.addEventListener('input', (_event) => handleAllowSubmission(submitButton, inputs))
  }
}
