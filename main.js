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
    this.books = [];
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
const submitFormBtn = document.querySelector('.form-submit-btn');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookReadStatus = document.querySelector('input[name=book_readStatus]');
const titleContainer = document.querySelector('.title');
const authorContainer = document.querySelector('.author');
const pagesContainer = document.querySelector('.pages');
const readStatusContainer = document.querySelector('.readStatus');


const openAddBookModal = () => {
  // Reset form to default values
  bookForm.reset();

  addBookModal.classList.add('active');
  overlay.classList.add('active');
 }

const closeAddBookModal = () => {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
}

const createNewBook = () => {
  /* 
    .value is for form inputs
    .textContent is to get a textual representation of what the node contains

    input elements content model is nothing -> elements must contain no text nodes and element nodes
  */
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  const status = bookReadStatus.value;

  checkInput();

  return new Book(title, author, pages, status);
}

const checkInput = (e) => {
  e.preventDefault();

  const div = document.createElement('div');
  const errorMsg = document.createElement('p');

  div.setAttribute('class', 'error-container');
  p.textContent = "* Please try again";

  if (bookTitle.value === '') {
    bookTitle.classList.add('.error');
    errorMsg.classList.add('input-error');
    
  }
}

const addBookToGrid = () => {
  resetGrid();

  for (let book in library.books) {
    createBookCard(book);
  }
}

const resetGrid = () => {
  bookGrid.innerHTML = addBookBtn;
}

const createBookCard = (newBook) => {
  const cardContainer = document.createElement('div');
  cardContainer.setAttribute('id', 'card-container');



}

const addBookToLibrary = (e) => {
  // To prevent form submission
  e.preventDefault();

  const newBook = createNewBook();

  if (library.bookExists(newBook)) {
    return 'error, book already exists';
  }

  library.addBook(newBook);
}


submitFormBtn.addEventListener('click', addBookToLibrary);
overlay.addEventListener('click', closeAddBookModal);
closeFormBtn.addEventListener('click', closeAddBookModal);
addBookBtn.addEventListener('click', openAddBookModal);