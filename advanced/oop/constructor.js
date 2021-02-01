// Constructor
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  // Bad practice (Will create getSummary for each instance)
  this.getSummary = function () {
    return `${this.title} was written by ${this.author} in ${this.year}.`;
  };
}

const book = new Book("C++", "John doe", "2019");
const book2 = new Book("Python", "John wick", "2016");

console.log(book.getSummary());
console.log(book2.getSummary());
