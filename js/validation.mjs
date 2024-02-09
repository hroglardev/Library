export const validateInput = (input) => {
  let errorMessage = ''
  if (input.value.trim() === '') {
    errorMessage = 'Must complete the field'
  }

  if (input.id === 'pages' && Number.isNaN(Number(input.value))) {
    errorMessage = 'Must be a number'
  }

  return errorMessage
}
