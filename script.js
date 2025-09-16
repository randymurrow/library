const myLibrary = []

function Book(id, title, author, pages, haveRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype.toggleRead = function() {
    return this.haveRead = !this.haveRead;
}

document.addEventListener('DOMContentLoaded', function() {
    const libraryTable = document.getElementById("library-table");

    function addBookToLibrary(title, author, pages, haveRead) {
        let id = crypto.randomUUID();
        let newBook = new Book(id, title, author, pages, haveRead);
        myLibrary.push(newBook);

        let newRow = libraryTable.insertRow();

        let newTitle = newRow.insertCell(0);
        newTitle.textContent = newBook.title;
        newTitle.classList.add("bold");

        let newAuthor = newRow.insertCell(1);
        newAuthor.textContent = newBook.author;

        let newPages = newRow.insertCell(2);
        newPages.textContent = newBook.pages;

        let newHaveRead = newRow.insertCell(3);
        newHaveRead.textContent = newBook.haveRead;

        let buttons = newRow.insertCell(4);
        let toggleReadButton  = document.createElement('button');
        toggleReadButton.classList.add("toggle", "bold");
        toggleReadButton.setAttribute("data-id", id);
        toggleReadButton.textContent = "toggle read status";
        buttons.append(toggleReadButton);

        toggleReadButton.addEventListener("click", (event) => {
            let bookID = event.target.getAttribute('data-id');
            findBook = myLibrary.find(Book => Book.id === bookID);
            findBook.toggleRead();
            const row = event.target.closest('tr');
            const cellToChange = row.children[3];
            cellToChange.textContent = findBook.haveRead;
        });

        let deleteButton = document.createElement('button');
        deleteButton.classList.add("delete", "bold");
        deleteButton.setAttribute("data-id", id);
        deleteButton.textContent = "delete";
        buttons.append(deleteButton);

        deleteButton.addEventListener("click", (event) => {
            let bookID = event.target.getAttribute('data-id');
            bookIndex = myLibrary.findIndex(Book => Book.id === bookID);
            if (bookIndex != -1) {
                myLibrary.splice(bookIndex, 1);
            }
            const row = event.target.closest('tr');
            libraryTable.deleteRow(row.rowIndex);
        });
    };

    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 246, true);
    addBookToLibrary("War and Peace", "Leo Tolstoy", 543, false);

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
        dialog.close();
        addForm.reset();
    });
});