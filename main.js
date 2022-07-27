class Book {
  constructor(title = '', author = '', pages = '0', readStatus = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

class Library {
  constructor() {
    this.library = [];
  }

  //Methods
  bookExists(newBook) {
    return this.library.some( book => book.title === newBook.title);
  }

  addBook(newBook) {
    if( !this.bookExists(newBook) ) {
      this.library.push(newBook);
    }
  }

  removeBook(title) {
    return this.library.filter( book => book.title !== title);
  }
}

const library = new Library();

