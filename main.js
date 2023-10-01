const myLibrary = [];

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    if (book instanceof Book) {
        myLibrary.push(book);
        return;
    }
    console.log("Invalid input (addBookToLibrary)");
}