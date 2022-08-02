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
        'pages': '1337'
      },
      {
        'title': 'Gintama',
        'author': 'Hideaki Sorachi',
        'pages': '420'
      }
    ];
  }

  //Methods
  bookExists(newBook) {
    return this.books.some( book => book.title === newBook.title);
  }

  addBook(newBook) {
    if( !this.bookExists(newBook) ) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    return this.books.filter( book => book.title !== title);
  }
}

const library = new Library();


const addBookBtn = document.querySelector("#addBookBtn");
const bookForm = document.querySelector('.book-form-modal');
const addBookModal = document.querySelector('.add-book-modal');
const bookGrid = document.querySelector('#bookGrid');
const overlay = document.querySelector('.overlay');
const closeFormBtn = document.querySelector('.form-exit-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookReadStatus = document.querySelector('input[name=book_readStatus]:checked');


const openAddBookModal = () => {
  bookForm.reset();
  addBookModal.classList.add('active');
  overlay.classList.add('active');
 }

const closeAddBookModal = () => {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
}

const createNewBook = () => {
  const title = bookTitle.textContent;
  const author = bookAuthor.textContent;
  const pages = bookPages.textContent;
  const status = bookReadStatus.value;

  return new Book(title, author, pages, status);
}

const addBookToLibrary = () => {
  const newBook = createNewBook();

  if (library.books.bookExists(newBook)) {
    return 'error, book already exists';
  }

  
}

overlay.addEventListener('click', closeAddBookModal);
closeFormBtn.addEventListener('click', closeAddBookModal);
addBookBtn.addEventListener('click', openAddBookModal);