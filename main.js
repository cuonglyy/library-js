class Book {
  constructor(title = '', author = '', pages = '0', readStatus = undefined) {
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
const titleErrorMsg = document.querySelector('.title > .error-msg');
const authorErrorMsg = document.querySelector('.author > .error-msg');
const pagesErrorMsg = document.querySelector('.pages > .error-msg');
const statusErrorMsg = document.querySelector('.readStatus > .error-msg');


const openAddBookModal = () => {
  // Reset form to default values
  bookForm.reset();

  addBookModal.classList.add('active');
  overlay.classList.add('active');
 }

const closeAddBookModal = () => {
  bookForm.reset();
  removeErrors();
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
  const status = bookReadStatus.checked.value;

  if (!checkInput(title, author, pages, status)) {
    return;
  }

  return new Book(title, author, pages, status);
}

const checkInput = (title, author, pages, status) => {

  let errorStatus = false;

  if (title === '' || title.startsWith(' ')) {
    bookTitle.classList.add('error-border');
    titleErrorMsg.style.display = 'block';
    errorStatus = true;
  } else {
    bookTitle.classList.remove('error-border');
    titleErrorMsg.style.display = 'none';
    errorStatus = false;
  }

  console.log(errorStatus);

  if (author === '' || author.startsWith(' ')) {
    bookAuthor.classList.add('error-border');
    authorErrorMsg.style.display = 'block';
    errorStatus = true;
  } else {
    bookAuthor.classList.remove('error-border');
    authorErrorMsg.style.display = 'none';
    errorStatus = false;
  }

  console.log(errorStatus);

  if (pages === '' || pages.includes('.')) {
    bookPages.classList.add('error-border');
    pagesErrorMsg.style.display = 'block';
    errorStatus = true;
  } else {
    bookPages.classList.remove('error-border');
    pagesErrorMsg.style.display = 'none';
    errorStatus = false;
  }

  console.log(errorStatus);

  if (status === undefined) {
    statusErrorMsg.style.display = 'block';
    errorStatus = true;
  } else {
    statusErrorMsg.style.display = 'none';
    errorStatus = false;
  }

  console.log(status);
  console.log(errorStatus);
  return errorStatus;
}

const addBookToLibrary = (e) => {
  // To prevent form submission
  e.preventDefault();

  const newBook = createNewBook();
  // No inputs returns undefined

  if (library.bookExists(newBook)) {
    return 'error, book already exists';
  }

  library.addBook(newBook);
  closeAddBookModal();
}

const removeErrors = () => {
  bookTitle.classList.remove('error-border');
  titleErrorMsg.style.display = 'none';

  bookAuthor.classList.remove('error-border');
  authorErrorMsg.style.display = 'none';

  bookPages.classList.remove('error-border');
  pagesErrorMsg.style.display = 'none';

  statusErrorMsg.style.display = 'none';
}

/*
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
*/

//bookForm.addEventListener('submit', checkInput);
submitFormBtn.addEventListener('click', addBookToLibrary);
overlay.addEventListener('click', closeAddBookModal);
closeFormBtn.addEventListener('click', closeAddBookModal);
addBookBtn.addEventListener('click', openAddBookModal);