const addBookBtn = document.querySelector(".add");

class Book {
    constructor(
      title = 'Unknown',
      author = 'Unknown',
      pages = '0',
      isRead = false
    ) {
      this.title = title
      this.author = author
      this.pages = pages
      this.isRead = isRead
    }
  }

class Library {
  constructor() {
    this.books = []
    this.isModalOpen = false;
  }

  addBook(newBook) {
    if (!(newBook instanceof Book)) {
        console.log("Invalid input (addBookToLibrary)");
        return;
    }
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook)
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title)
  }

  getBook(title) {
    return this.books.find((book) => book.title === title)
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title)
  }
}

const library = new Library();
const modal = document.createElement('div');
const overlay = document.createElement('div');

const openAddBookModal = () => {
  const form = document.createElement('form');
  form.id = 'addBookForm';
  
  const h2 = document.createElement('h2');
  h2.innerText = 'Add new book';
  form.appendChild(h2);

  const titleInput = document.createElement('input');
  titleInput.classList.add('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Book title';
  form.appendChild(titleInput);
  
  const authorInput = document.createElement('input');
  authorInput.classList.add('input');
  authorInput.type = 'text';
  authorInput.name = 'author';
  authorInput.placeholder = 'Author';
  form.appendChild(authorInput);
  
  const pagesInput = document.createElement('input');
  pagesInput.classList.add('input');
  pagesInput.type = 'number';
  pagesInput.name = 'pages';
  pagesInput.placeholder = 'Pages';
  form.appendChild(pagesInput);
  
  modal.append(form);

  overlay.classList.add('overlay');
  modal.classList.add('modal');
  document.querySelector('.screen').insertBefore(overlay, document.querySelector('.screen').firstChild);
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 50)
  library.isModalOpen = true;
}

const closeAddBookModal = () => {

}


addBookBtn.addEventListener('click', () => {
  console.log('isModalOpen: ', library.isModalOpen);
  if (library.isModalOpen) {
    return;
  }
  openAddBookModal();
});


function addBookToLibrary(book) {
    if (book instanceof Book) {
        library.addBook(book);
        return;
    }
    console.log("Invalid input (addBookToLibrary)");
}