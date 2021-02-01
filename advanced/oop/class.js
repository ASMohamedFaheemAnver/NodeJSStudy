class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getSummary() {
    return `${this.title} was written by ${this.author} in ${this.year}.`;
  }

  static topBookStore() {
    return "Barnes & Noble";
  }
}

const book = new Book("C++", "John wick", "2019");

console.log(book.topBookStore());
console.log(Book.topBookStore());
