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
        let deleteBook = newRow.insertCell(4);
        let button = document.createElement('button');
        // newRow.setAttribute("data-id", id);
        newTitle.textContent = newBook.title;
        newTitle.classList.add("bold");
        newAuthor.textContent = newBook.author;
        newPages.textContent = newBook.pages;
        newHaveRead.textContent = newBook.haveRead;
        button.classList.add("delete", "bold");
        button.setAttribute("data-id", id);
        button.textContent = "X";
        deleteBook.append(button);

        button.addEventListener("click", (event) => {
            const bookID = event.target.getAttribute('data-id');
            bookIndex = myLibrary.findIndex(Book => Book.id === bookID);
            if (bookIndex != -1) {
                myLibrary.splice(bookIndex, 1);
            }
            const row = event.target.closest('tr');
            libraryTable.deleteRow(row.rowIndex);
            console.log(myLibrary);
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
        console.log(myLibrary);
        dialog.close();
        addForm.reset();
    });
});