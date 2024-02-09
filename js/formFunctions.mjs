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
