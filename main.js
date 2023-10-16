class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = '0',
    isRead = false,
    bDiv,
    ) {
      this.title = title
      this.author = author
      this.pages = pages
      this.isRead = isRead
    }
  }
  
class Library {
  constructor() {
    if (!(this instanceof Library)) {
      return new Library();
    }
    this.books = []
  }

  addBook(newBook) {
    if (!(newBook instanceof Book)) {
      console.log("Invalid input (addBookToLibrary)");
      return;
    }
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook)
      console.log(newBook);
    }
  }

  removeBook(title) {
    return this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }

  print() {
    console.log("Books in library: ");
    this.books.forEach((book) => {
      console.log(book, ' ');
    });
  }
}

const library = new Library();
const modal = document.createElement('div');
const overlay = document.createElement('div');
const addBookBtn = document.querySelector(".add");
const closeBookBtn = document.createElement('button');

function removeBookDiv(rmBook) {
  rmBook.bDiv.style.opacity = '0'; // Start the fade-out transition
  setTimeout(() => {
    rmBook.bDiv.remove();  // Remove the div after the fade-out completes
  }, 500);
  library.removeBook(rmBook.title); // Remove the book from the library
}

function appendBookDiv(newBook) {
  
  
  
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book');
  
  const titleP = document.createElement('p');
  titleP.innerText = newBook.title;
  bookDiv.appendChild(titleP);
  titleP.classList.add('title');
  titleP.classList.add('book-info');
  
  const authorP = document.createElement('p');
  authorP.innerText = newBook.author;
  bookDiv.appendChild(authorP);
  authorP.classList.add('book-info');
  
  const pagesP = document.createElement('p');
  pagesP.innerText = newBook.pages;
  bookDiv.appendChild(pagesP);
  pagesP.classList.add('book-info');
  
  const isReadDiv = document.createElement('div');
  if (newBook.isRead) {
    isReadDiv.innerHTML = 'Read';
    isReadDiv.classList.add('is-read');
  } else {
    isReadDiv.innerHTML = 'Not read';
    isReadDiv.classList.add('not-read');
  }
  bookDiv.appendChild(isReadDiv);
  
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = 'Remove';
  removeBtn.classList.add('remove-btn');
  bookDiv.appendChild(removeBtn);
  
  
  newBook.bDiv = bookDiv;
  document.querySelector('.book-display').appendChild(bookDiv);
  
  setTimeout(() => {
    bookDiv.style.opacity = '1';
  }, 20);
  
  removeBtn.addEventListener('click' , () => {
    removeBookDiv(newBook);
  });
}

function handleSubmitForm(event) {
  event.preventDefault(); // To prevent the form from submitting
  
  const form = document.getElementById('addBookForm');
  
  console.log("Form:", form);
  console.log("Form Elements:", form.elements);
  
  const newBook = new Book(
    form.elements.title.value, 
    form.elements.author.value,
    form.elements.pages.value,
    form.elements.isRead.checked
    );
    
    closeAddBookModal();
    
    if (newBook.title === '' || newBook.author === '') {
      alert('Invalid title or author');
      return;
    }
    
    if (newBook.pages <= 0 || newBook.pages > 999999) {
      alert('Pages limit exceeded');
      return;
    }
    
    if (library.isInLibrary(newBook)) {
      alert('Book is already in library.');
      return;
    }
    
    library.addBook(newBook);
    appendBookDiv(newBook);
  }
  
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
      titleInput.maxLength = '30';
      form.appendChild(titleInput);
      
  const authorInput = document.createElement('input');
  authorInput.classList.add('input');
  authorInput.type = 'text';
  authorInput.name = 'author';
  authorInput.placeholder = 'Author';
  authorInput.maxLength = '30';
  form.appendChild(authorInput);
  
  const pagesInput = document.createElement('input');
  pagesInput.classList.add('input');
  pagesInput.type = 'number';
  pagesInput.name = 'pages';
  pagesInput.placeholder = 'Pages';
  pagesInput.min = '1';
  pagesInput.max = '99999';
  form.appendChild(pagesInput);
  
  const isReadContainer = document.createElement('div');
  isReadContainer.classList.add('read-container');
  form.appendChild(isReadContainer);
  
  const isReadH4 = document.createElement('h4');
  isReadH4.innerText = 'Have you read it?';
  isReadContainer.appendChild(isReadH4);
  
  const isReadInput = document.createElement('input');
  isReadInput.classList.add('checkbox');
  isReadInput.type = 'checkbox';
  isReadInput.name = 'isRead';
  isReadContainer.appendChild(isReadInput);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');
  form.appendChild(btnContainer);

  const cancelBtn = document.createElement('button');
  cancelBtn.setAttribute('type', 'button')
  cancelBtn.classList.add('cancel-btn');
  cancelBtn.innerText = 'Cancel';
  btnContainer.appendChild(cancelBtn);

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('submit-btn');
  submitBtn.innerText = 'Submit';
  btnContainer.appendChild(submitBtn);

  modal.append(form);

  overlay.classList.add('overlay');
  modal.classList.add('modal');
  overlay.style.display = 'block';
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.appendChild(modal);
  modal.style.display = 'block';
  overlay.style.opacity = '1';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 50)
  
  submitBtn.addEventListener('click', handleSubmitForm);
  cancelBtn.addEventListener('click', closeAddBookModal);
}

const closeAddBookModal = () => {
  overlay.remove();

  modal.style.display = 'none';
  overlay.style.opacity = '0';
  modal.style.opacity = '0';
  modal.innerHTML = '';
}

addBookBtn.addEventListener('click', () => {
  openAddBookModal();
});

function addBookToLibrary(book) {
    if (book instanceof Book) {
        library.addBook(book);
        return;
    }
    console.log("Invalid input (addBookToLibrary)");
}