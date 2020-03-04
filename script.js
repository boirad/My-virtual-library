
const addBtn = document.querySelector("#addBtn");
const closeBtn = document.querySelector("#closeBtn")
const formContainer = document.querySelector("#form-container")
const navbar = document.querySelector("nav");

let inputTitle = document.querySelector("#title");
let inputAuthor = document.querySelector("#author");
let inputPages = document.querySelector("#pages");
let inputRead = document.querySelector("#read");

let isRead;

const bookTable = document.querySelector("#bookTable");
let submit = document.querySelector("#submit");

let myLibrary = [];

addBtn.addEventListener("click", () => {
    formContainer.classList.remove("hidden");
    submit.classList.add("pointer");
    closeBtn.classList.add("pointer");
    navbar.classList.add("opacity");
    bookTable.classList.add("opacity");
})

closeBtn.addEventListener("click", () => {
    formContainer.classList.add("hidden");
    navbar.classList.remove("opacity");
    bookTable.classList.remove("opacity");
})

submit.addEventListener("click", () => {
    event.preventDefault()

    if(inputTitle.value == "" || inputAuthor.value == "" || inputPages.value == ""){
        submit.disabled = true;
    } else {
        submit.disabled = false;
        const bookContainer = [];
        bookContainer.push(inputTitle.value);
        bookContainer.push(inputAuthor.value);
        bookContainer.push(inputPages.value);

        let check = inputRead.checked;

        if(check){
            inputRead.value = "Yes"
            bookContainer.push(inputRead.value);
            isRead = true;
        } else {
            inputRead.value = "No";
            bookContainer.push(inputRead.value);
            isRead = false;
        }

        addBookToLibrary(bookContainer);
    }
    submit.disabled = false;
})

function book (title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function addBookToLibrary(bookContainer){
  const bookItem = new book(bookContainer[0], bookContainer[1], bookContainer[2], bookContainer[4]);
  render(bookItem);
}

function render(bookItem){
    const tableRow = document.createElement("tr");
    const title = document.createElement("td");
    const author = document.createElement("td");
    const pages = document.createElement("td");
    const read = document.createElement("td");

    const statusArea = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        tableRow.remove();
    })

    const statusButton = document.createElement("button");
    statusButton.classList.add("status")
    statusButton.textContent = "Read";
    statusButton.addEventListener("click", () => {
       
        if(isRead){
            statusButton.textContent = "Read";
            read.innerText = "No";
            isRead = false;
        } else {
            statusButton.textContent = "Unread";
            read.innerText = "Yes";
            isRead = true;
        }
    })

    title.textContent = bookItem.title;
    author.textContent = bookItem.author;
    pages.textContent = bookItem.pages;
    read.textContent = inputRead.value;

    tableRow.appendChild(title);
    tableRow.appendChild(author);
    tableRow.appendChild(pages);
    tableRow.appendChild(read);
    tableRow.appendChild(statusArea);
    statusArea.appendChild(statusButton);
    statusArea.appendChild(deleteBtn);
    bookTable.appendChild(tableRow);

    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
}


