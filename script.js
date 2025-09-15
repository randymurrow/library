const myLibrary = []

function Book(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, pages, haveRead) {
    let id = crypto.randomUUID();
    let newBook = new Book(id, title, author, pages, haveRead);
    myLibrary.push(newBook);
}

document.addEventListener('DOMContentLoaded', function() {
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 246, true);
    addBookToLibrary("War and Peace", "Leo Tolstoy", 543, false);

    const libraryTable = document.getElementById("library-table");
    myLibrary.forEach( (book) => {
        let newRow = libraryTable.insertRow();
        let title = newRow.insertCell(0);
        let author = newRow.insertCell(1);
        let pages = newRow.insertCell(2);
        let haveRead = newRow.insertCell(3);
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        haveRead.textContent = book.haveRead;
    });

    const newBook = document.querySelector("#new-book");
    const cancelButton = document.querySelector("#cancel");
    const dialog = document.querySelector("#book-dialog");

    newBook.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelButton.addEventListener('click', () => {
        dialog.close();
    })

});