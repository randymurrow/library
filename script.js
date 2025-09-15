const myLibrary = []

function Book(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

document.addEventListener('DOMContentLoaded', function() {
    const libraryTable = document.getElementById("library-table");

    function addBookToLibrary(title, author, pages, haveRead) {
        let id = crypto.randomUUID();
        let newBook = new Book(id, title, author, pages, haveRead);
        myLibrary.push(newBook);
        let newRow = libraryTable.insertRow();
        let newTitle = newRow.insertCell(0);
        let newAuthor = newRow.insertCell(1);
        let newPages = newRow.insertCell(2);
        let newHaveRead = newRow.insertCell(3);
        newTitle.textContent = newBook.title;
        newAuthor.textContent = newBook.author;
        newPages.textContent = newBook.pages;
        newHaveRead.textContent = newBook.haveRead;
    }

    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 246, true);
    addBookToLibrary("War and Peace", "Leo Tolstoy", 543, false);

    // myLibrary.forEach( (book) => {
    //     let newRow = libraryTable.insertRow();
    //     let title = newRow.insertCell(0);
    //     let author = newRow.insertCell(1);
    //     let pages = newRow.insertCell(2);
    //     let haveRead = newRow.insertCell(3);
    //     title.textContent = book.title;
    //     author.textContent = book.author;
    //     pages.textContent = book.pages;
    //     haveRead.textContent = book.haveRead;
    // });

    const newBook = document.getElementById("new-book");
    const cancelButton = document.getElementById("cancel");
    const dialog = document.getElementById("book-dialog");
    const addForm = document.getElementById("add-form");

    newBook.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelButton.addEventListener('click', () => {
        dialog.close();
    })

    addForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const titleInput = document.getElementById("title");
        const titleValue = titleInput.value;
        const authorInput = document.getElementById("author");
        const authorValue = authorInput.value;
        const pagesInput = document.getElementById("pages");
        const pagesValue = pagesInput.value;
        const haveReadInput = document.getElementById("have-read");
        const haveReadValue = haveReadInput.value;

        addBookToLibrary(titleValue, authorValue, pagesValue, haveReadValue);
        console.log(myLibrary);
        dialog.close();
        addForm.reset();
    })

});