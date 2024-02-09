export function Book(title, author, pages, isRead, position) {
  this.title = title
  this.author = author
  this.pages = pages
  this['is-read'] = isRead ? 'Read' : 'Not read'
  this.index = position
  this.info = () => `${this.title} by ${this.author}, ${this.pages}, ${this['is-read']}`
}
