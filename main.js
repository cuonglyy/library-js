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
    this.books = this.books.filter( book => book.title !== title);
  }

  getBook(title) {
    return this.books.find( book => book.title === title);
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
const bookReadStatus = document.querySelectorAll('input[name="book_readStatus"]');
const removeButton = document.querySelector('.remove-card');

/*
const titleErrorMsg = document.querySelector('.title > .error-msg');
const authorErrorMsg = document.querySelector('.author > .error-msg');
const pagesErrorMsg = document.querySelector('.pages > .error-msg');
const statusErrorMsg = document.querySelector('.readStatus > .error-msg');
*/

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
  const status = Array.from(bookReadStatus).find(button => button.checked).value;
  const booleanStatus = (status === 'true'); // Converts string to boolean type

  /*
  if (checkInput(title, author, pages, status)) {
    return;
  }
  */

  return new Book(title, author, pages, booleanStatus);
}

const deleteBook = (e) => {
  const title = e.target.parentNode.firstChild.textContent;
  library.removeBook(title)
  updateBookGrid();
}

/*

  * Can worry about finishing input checking later *

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

  console.log(errorStatus);
  return errorStatus;
}

*/

const addBookToLibrary = (e) => {
  // To prevent form submission
  e.preventDefault();

  const newBook = createNewBook();

  if (library.bookExists(newBook)) {
    return 'error, book already exists';
  }

  library.addBook(newBook);
  updateBookGrid();
  closeAddBookModal();
}

const updateBookGrid = () => {
  resetGrid();

  for (let book of library.books) {
    createBookCard(book);
  }
}

const resetGrid = () => {
  /* Removing all book cards from the grid except for add book */
  const cards = Array.from(document.querySelectorAll('#bookGrid div'));
  cards.map(card => card.parentNode.removeChild(card));
}

const toggleRead = (e) => {
  const title = e.target.parentNode.firstChild.textContent;
  const book = library.getBook(title);

  book.readStatus = !book.readStatus;
  updateBookGrid();
}

const createBookCard = (book) => {

  const containerDiv = document.createElement('div');
  const removeButton = document.createElement('button');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const readButton = document.createElement('button');

  removeButton.textContent = 'x';
  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;
  readButton.textContent = 'Read';

  containerDiv.classList.add('card-container');
  removeButton.classList.add('remove-card');

  console.log(book.readStatus);

  if (book.readStatus) {
    readButton.textContent = 'Read';
    containerDiv.classList.add('card-read');
    readButton.classList.add('read-button');
  } else {
    readButton.textContent = 'Not Read';
    containerDiv.classList.add('card-notread');
    readButton.classList.add('notread-button');
  }
  
  if (!document.querySelector('.card-container')) { bookGrid.appendChild(containerDiv); }
  else { bookGrid.insertBefore(containerDiv, addBookBtn.nextSibling); }

  containerDiv.appendChild(title);
  containerDiv.appendChild(author);
  containerDiv.appendChild(pages);
  containerDiv.appendChild(removeButton);
  containerDiv.appendChild(readButton);


  readButton.addEventListener('click', toggleRead);
  removeButton.addEventListener('click', deleteBook);
}

//bookForm.addEventListener('submit', checkInput);
submitFormBtn.addEventListener('click', addBookToLibrary);
overlay.addEventListener('click', closeAddBookModal);
closeFormBtn.addEventListener('click', closeAddBookModal);
addBookBtn.addEventListener('click', openAddBookModal);