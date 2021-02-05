// Getting DOM Elements
// Modal Page
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
<td class="book-body">${data.authorName}</td>
<td class="book-price">${data.bookPrice}</td>
<td><button class="btn" onclick='display()'> Display</button></td>
<td><button id="buy-Book" class="btn buy-button">Buy</button></td>
<td><button class="btn delete-button">
<i class="fas fa-times"></i>
</button></td>
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
            // book.style.display = 'none';
            tableTd.innerHTML = `<p>Sorry !! no books found</p>`

        }
    })

}


function display(data) {

    tableTd.innerHTML = '';
    var length = bookData.length;
    //     var htmltext = `     <tr>
    //     <th>S.No</th>
    //     <th>Book Name</th>
    //     <th>Author Name</th>
    //     <th>Price $$</th>
    //     <th>Edit</th>
    //     <th>Remove</th>
    // </tr>`
    const book = document.createElement('tr');
    book.classList.add('book');
    for (var i = 0; i < length; i++) {
        console.log(bookData[i]);
        book.innerHTML = "<td></td><td class ='book-title'>" +
            bookData[i].bookName +
            "</td><td>" +
            bookData[i].authorName +
            "</td><td>" +
            bookData[i].bookPrice +
            "</td><td><button class='btn' onclick='edit(" + i + ")'>Edit</button></td><td><button class='btn' onclick='remove(" + i + ")'>Remove</button></td></tr>";
    }
    // Add the newly book to the DOM
    library.push(book);

    tableTd.appendChild(book);
}

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
        "</td><td><button onclick='edit(" +
        indice + ")'>Edit</button></td><td><button onclick='remove(" +
        indice + ")'>Remove</button></td></tr>";
    document.getElementById("table" + indice).innerHTML = htmltext;
}

function edit(indice) {
    // htmltext.innerHTML = '';
    var htmltext = "<tr ><td></td><td><input  class='input' id='inputname" + indice + "' type='text' value='" +
        bookData[indice].bookName +
        "'></td><td><input class='input' id='authorname" + indice + "' type='text' value='" +
        bookData[indice].authorName +
        "'></td><td><input  class='input' id='inputlevel" + indice + "' type='text' value='" +
        bookData[indice].bookPrice +
        "'></td><td><button onclick='save(" + indice + ")'>Save</button></td><td><button onclick='remove(" + indice + ")'>Remove</button></td></tr>";
    document.getElementById("table" + indice).innerHTML = htmltext;
}

function remove(indice) {
    console.log(bookData);
    bookData.splice(indice, 1);
    display();
}


// Function to Go Back page
function backFun() {
    tableTd.innerHTML = '';
    // localStorage.clear();
}


// function for reading the book data


function ReadFunc(data, index) {

    bookData.forEach((data, index) => {

        tableTd.innerHTML = '';

        //  create div for the book
        const newTable = document.createElement('div');
        // Assign class to the div
        newTable.classList.add('book');
        // create the inner HTML of the div
        newTable.innerHTML = `
        <div class="selected-book">
        <h3>Search results for ${data.bookName}:</h3>
        <td class="book-image" ><img src="images/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg" onclick="show_image()" style="width:200px;, height:200px;"  /></td>
        <h1 style="color:#2f3640;">${data.bookName}</h1>
        <h2 style="color:#2f3640;">${data.authorName}</h2>
        <div class="selected-meal-info">
        <p style="color:gray;">Only a little more than forty years ago, the brutal Khmer Rouge overtook the country of Cambodia. In just four years, this regime perpetrated the genocide of up two two million Cambodians in its horrific reign. However, we may never know the true extent of their crimes. 

        But through the first-hand account of Loung Ung in her book First They Killed My Father: A Daughter of Cambodia Remembers, we get an intimate glimpse of what it was like. She was only five when Pol Pot and his regime took over the country. But her description of the war crimes and desperation she saw in her young years will make you feel like you are witnessing history with her. </p>
        </div>
        <div class="main">
        <p style="color:red;">Price:${data.bookPrice}</p>
        <ul>
        <a href="" onClick="${backFun()}">Go Back</a>
        </ul>
        </div>
        </div>`;

        // Add the newly book to the DOM
        // bookData.push(newTable);

        // Display the book data to the DOM
        tableTd.appendChild(newTable);
    })
};


// Function Add To Cart
function buyFunc() {
    bookData.forEach((data, index) => {
        tableTd.innerHTML = '';
        //  create div for the book
        const buyBook = document.createElement('table');
        // Assign class to the div
        buyBook.classList.add('book');
        // create the inner HTML of the div
        // <td class="book-image" ><img src="images/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg" style="width:20px;, height:20px"  /></td>
        buyBook.innerHTML = `
        <tr>
        <th>S.No</th>
        <th>Book Name</th>
        <th>Price $$</th>
        <th>Remove</th>
        </tr>
        <tr id="qty">
        <td></td>
<td class ="book-title">${data.bookName}</td>
<td class="book-price" id="bookPrice">${data.bookPrice}</td>
<td><button class="btn delete-button" data-book="${data.bookName}${data.authorName}${data.bookPrice}">
<i class="fas fa-times"></i>
</button></td>
</tr>
</table>
<footer class="para">
<p>Total amount of books: <span style="color:red;" id="total">${data.bookPrice}</span></p>
<a href="" class="back" onClick="${backFun()}">Go Back</a>
</footer>

`;
        // Add the newly book to the DOM
        library.push(buyBook);

        // Display the book data to the DOM
        tableTd.appendChild(buyBook);
    });

}


// on page reload this function work it has everything inside.
// createBooks();

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

let buyButton = document.querySelectorAll('.buy-button') // getting the read button
buyButton.forEach(key => key.addEventListener('click', buyFunc));


let readButton = document.querySelectorAll('.read-button') // getting the read button
readButton.forEach(key => key.addEventListener('click', ReadFunc));