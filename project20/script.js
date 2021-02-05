// Getting DOM Elements
// Modal Page
const backBtn = document.getElementById('back-button');
const buttonDiv = document.getElementById('button-div');
const homePage = document.getElementById('home-page');
const addNewBookBtn = document.getElementById('add-new-book');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal-container');
const submitBtn = document.getElementById('submit-btn');
const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const bookPrice = document.getElementById('book-price');
const bookImage = document.getElementById('book-image');
// Book containet/Table
const bookContainer = document.getElementById('book-container');
const tableTd = document.getElementById('td');
//  Total Books
const totalBooks = document.getElementById('total-books');
const total = document.getElementById('total');
// Search Books
const searchBook = document.getElementById('search');
// Clear
const clearCardBtn = document.getElementById('clear-btn');

// Collection of book data in the form of Array
const library = [];

// Book data to show in the DOM
const bookData = getBookData();
console.log(bookData);

// FUNCTIONS
// 1. Function to create all books
function createAllBooks() {
    createBooks();
}

// 2. Function to create single book data in the table
function createBooks(data, index) {
    backBtn.innerHTML = '';
    bookData.forEach((data, index) => {

        //  create div for the book
        const book = document.createElement('tr');
        // Assign class to the div
        book.classList.add('book');
        // create the inner HTML of the div
        // <td class="book-image" ><img src="images/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg" style="width:20px;, height:20px"  /></td>
        book.innerHTML = `
        <td></td>
<td class ="book-title">${data.bookName}</td>
</button></td>
<td><button class="btn" id="display" onclick='display()'> Display</button></td>

`;
        // Add the newly book to the DOM
        library.push(book);

        // Display the book data to the DOM
        tableTd.appendChild(book);
    });
    totalBook();
}



// 3. Function to get book data from the local storage and change into JSON
function getBookData() {
    const getBooks = JSON.parse(localStorage.getItem('books'));
    // console.log(getBooks);
    // check if the data exists or not
    return getBooks === null ? [] : getBooks;
}

// 4. Function to save data into local storage and display to the screen
function saveBookData(books) {
    localStorage.setItem('books', JSON.stringify(books));
    // Reload Page
    // window.location.reload();

    window.location.reload();
}

// 5. Function of total books
function totalBook() {
    //  create div for the book
    const totalBook = document.createElement('div');
    // Assign class to the div
    totalBook.classList.add('totalBook');
    // create the inner HTML of the div
    totalBook.innerHTML = `
    <p id="total-books">Total Books: <span> ${library.length}</span></p>`;

    // Add the newly book to the DOM
    library.push(totalBook);

    // Display the book data to the DOM
    total.appendChild(totalBook);
}

// 6 Function to filter posts
function filterPost(e) {
    const filterTerm = e.target.value.toUpperCase();
    const books = document.querySelectorAll('.book');
    // console.log(posts);
    books.forEach(book => {
        const title = book.querySelector('.book-title').innerText.toUpperCase();

        if (title.indexOf(filterTerm) > -1) {
            book.style.display = '';
        } else {
            book.style.display = 'none';
            // tableTd.innerHTML = `<p>Sorry !! no books found</p>`

        }
    })

}

// 7. Function to display book data
function display(data) {
    backBtn.innerHTML = ` <button class="modal-btn" id="back-btn" onclick="goBackFun()"> Back</button>`;
    buttonDiv.innerHTML = '';
    tableTd.innerHTML = '';
    var length = bookData.length;
    var htmltext = `     <tr>
    <th>S.No</th>
    <th>Book Name</th>
    <th>Author Name</th>
    <th>Price $$</th>
    <th>Edit</th>
    <th>Remove</th>
</tr>`

    for (var i = 0; i < length; i++) {
        console.log(bookData[i]);
        htmltext += "<tr id='table" + i + "'><td></td><td>" +
            bookData[i].bookName +
            "</td><td>" +
            bookData[i].authorName +
            "</td><td>" +
            bookData[i].bookPrice +
            "</td><td><button class='btn' onclick='edit(" + i + ")'>Edit</button></td><td><button class='btn' onclick='remove(" + i + ")'>Remove</button></td></tr>";


        // Add the newly book to the DOM
        library.push(htmltext);

        // Display the book data to the DOM
        tableTd.innerHTML = htmltext;
    }
    // totalBook();
}

// 8. Function to save data
function save(indice) {
    bookData[indice].bookName = document.getElementById("inputname" + indice).value;
    bookData[indice].authorName = document.getElementById("authorname" + indice).value;
    bookData[indice].bookPrice = document.getElementById("inputlevel" + indice).value;
    var htmltext = "<tr id='table" + indice + "'><td></td><td>" +
        bookData[indice].bookName +
        "</td><td>" +
        bookData[indice].authorName +
        "</td><td>" +
        bookData[indice].bookPrice +
        "</td><td><button class='btn' onclick='edit(" +
        indice + ")'>Edit</button></td><td><button  class='btn' onclick='remove(" +
        indice + ")'>Remove</button></td></tr>";
    // Add the newly book to the DOM
    library.push(htmltext);
    document.getElementById("table" + indice).innerHTML = htmltext;
}

// 8. Function to edit data
function edit(indice) {
    // htmltext.innerHTML = '';
    var htmltext = "<tr ><td></td><td><input  class='input' id='inputname" + indice + "' type='text' value='" +
        bookData[indice].bookName +
        "'></td><td><input class='input' id='authorname" + indice + "' type='text' value='" +
        bookData[indice].authorName +
        "'></td><td><input  class='input' id='inputlevel" + indice + "' type='text' value='" +
        bookData[indice].bookPrice +
        "'></td><td><button class='btn' onclick='save(" + indice + ")'>Save</button></td><td><button class='btn' onclick='remove(" + indice + ")'>Remove<i class='fas fa-times'></i></button></td></tr>"
    document.getElementById("table" + indice).innerHTML = htmltext;
}

// 8. Function to remove data
function remove(indice) {
    console.log(bookData);
    bookData.splice(indice, 1);
    display();
}


//9. Function to Go Back page
function backFun() {
    tableTd.innerHTML = '';
    // localStorage.clear();
}

// 
function goBackFun() {
    window.history.go(-0);
}


//10. Function to homa page
function homeFunc() {
    window.history.back();
}

//10. Function to clear page
function clearFunc() {
    localStorage.clear;
}

// on page reload this function work it has everything inside.
createBooks();
// display();

// Event Listeners
// 1. Event to open modal page
addNewBookBtn.addEventListener('click', () => {
    modal.classList.add('show-modal');
});


// 2. Event to close modal page
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

// 3. Event for submitting the form
submitBtn.addEventListener('click', () => {
    // Get Users input
    const bookNameInput = bookName.value;
    const authorNameInput = authorName.value;
    const bookPriceInput = bookPrice.value;

    // Check if there are values 
    if (bookNameInput.trim() && authorNameInput.trim() && bookPriceInput.trim()) {
        const newBook = { bookName: bookNameInput, authorName: authorNameInput, bookPrice: bookPriceInput }
        console.log(newBook);

        createBooks(newBook);

        bookData.push(newBook);
        saveBookData(bookData);
    }
});

//4. Event to filter Posts that are already fetched
searchBook.addEventListener('input', filterPost);


// 6. Event Listener to clear all the cards
clearCardBtn.addEventListener('click', () => {
    localStorage.clear();
    tableTd.innerHTML = '';
    window.location.reload;
    bookContainer.innerHTML = `<p style="color:white;">No Books Added</p>`
        // Update the cirrent card reload
    tableTd.innerHTML = `<p></p>`
})