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
    this.books = [
      {
        'title': 'One Piece',
        'author': 'Eiichiro Oda',
        'pages': '4932943'
      },
      {
        'title': 'Gintama',
        'author': 'Hideaki Sorachi',
        'pages': '23532'
      }
    ];
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


const addBookBtn = document.querySelector("#addBookBtn");
const addBookModal = document.querySelector('.add-book-modal');
const bookGrid = document.querySelector('#bookGrid');
const overlay = document.querySelector('.overlay');


let openAddBookModal = (e) => {
  console.log(e);
  addBookModal.classList.add('active');
  overlay.classList.add('active');
 }

addBookBtn.addEventListener('click', openAddBookModal);