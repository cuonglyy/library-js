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
    this.library = [
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


const addBookCard = document.querySelector("#addBookCard");
const modal = document.querySelector('.modal');
const bookGrid = document.querySelector('#bookGrid');
const body = document.querySelector('body');


const openAddBookModal = () => {
  modal.classList.add('active');
  body.appendChild(modal);
}

addBookCard.addEventListener('click', openAddBookModal);