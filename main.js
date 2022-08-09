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
const bookReadStatus = document.querySelector('input[name="book_readStatus"]');
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
  bookForm.reset();

  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
  removeErrors();
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
  const status = bookReadStatus.checked.value;


  return new Book(title, author, pages, status);
}

const checkInput = (e) => {

  const errorMsg = document.createElement('p');
  errorMsg.textContent = "* Please try again";

  if (bookTitle.value === '' || bookTitle.value.startsWith(' ')) {
    e.preventDefault();
    bookTitle.classList.add('error');
    errorMsg.classList.add('input-error');
    errorMsg.style.display = 'block';
    titleContainer.appendChild(errorMsg);
  }
  if (bookAuthor.value === '' || bookAuthor.value.startsWith(' ')) {
    e.preventDefault();
    bookAuthor.classList.add('error');
    errorMsg.classList.add('input-error');
    errorMsg.style.display = 'block';
    authorContainer.appendChild(errorMsg);
  }
  if (isNaN(bookPages.value) || bookPages.value.startsWith(' ')) {
    e.preventDefault();
    bookPages.classList.add('error');
    errorMsg.classList.add('input-error');
    errorMsg.style.display = 'block';
    pagesContainer.appendChild(errorMsg);
  }
  if (!bookReadStatus.checked) {
    e.preventDefault();
    errorMsg.classList.add('input-error');
    errorMsg.style.display = 'block';
    pagesContainer.appendChild(errorMsg);
  }

}

const removeErrors = () => {
  errorMsg.classList.remove('input-error');
  errorMsg.style.display = 'none';
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
  closeAddBookModal();
}

bookForm.addEventListener('submit', checkInput);
submitFormBtn.addEventListener('click', addBookToLibrary);
overlay.addEventListener('click', closeAddBookModal);
closeFormBtn.addEventListener('click', closeAddBookModal);
addBookBtn.addEventListener('click', openAddBookModal);