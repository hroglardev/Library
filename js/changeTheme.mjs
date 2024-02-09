export const changeTheme = (rootElement) => {
  const currentTheme = rootElement.getAttribute('theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  rootElement.setAttribute('theme', newTheme)
}
