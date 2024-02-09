export const appendItems = (parent, ...children) => {
  children.forEach((child) => {
    parent.appendChild(child)
  })
}
