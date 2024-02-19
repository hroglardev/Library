export class Book {
  constructor(title, author, pages, isRead, position) {
    this.title = title
    this.author = author
    this.pages = pages
    this['is-read'] = isRead ? 'Read' : 'Not read'
    this.index = position
  }

  getinfo() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this['is-read']}`
  }
}
