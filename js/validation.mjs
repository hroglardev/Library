export const validateInputs = (inputValues) => {
  let errors = {}

  if (inputValues.title.trim() === '') {
    errors.title = 'Must complete the field'
  }

  if (inputValues.author.trim() === '') {
    errors.author = 'Must complete the field'
  }

  if (inputValues.pages.trim() === '') {
    errors.pages = 'Must complete the field'
  } else if (isNaN(Number(inputValues.pages))) {
    errors.pages = 'Must be a number'
  }

  return errors
}
