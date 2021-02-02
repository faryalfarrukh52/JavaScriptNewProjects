// Getting DOM Elements data and storing them in variables
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillioners = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateTotal = document.getElementById('calculate-total');
const refreshUser = document.getElementById('refresh');

// Create Initialize users Data using Array
let data = [];

// Create Initialize Users
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to Fetch Random Users Data From Api
//  API: randomuser.me/api
// New way of Fetching Api data using async Function..It is widely use now
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random() * 1000000)
    }

    // console.log(newUser);
    // console.log(data);

    // Calls Function
    addData(newUser);
}

// Function to double the Net Worth of each user
function doubleWorth() {
    data = data.map(item => {
        return {...item, worth: item.worth * 2 };
    });

    updateDOM();
}

// Function to sort users by richest
function sortRichest() {
    data.sort((a, b) => b.worth - a.worth);

    updateDOM();
}

// Function to FIlter the Users and show only Millionaires
function showMillions() {
    data = data.filter(
        item => item.worth > 1000000
    );
    updateDOM();
}

// Function to calculate total net worth of all the users
function calculateTotalWorth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    // html for displaying total on UI 
    const totalNetWorthElement = document.createElement('div');
    // totalNetWorthElement.classList.add('total');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong> ${formatCurrency(totalWorth)}</strong> </h3>`;
    main.appendChild(totalNetWorthElement);
}

// Function to Refresh Users
function refresh() {
    data = location.reload();
}

// Function to push New User Data in to Array
function addData(newUser) {
    data.push(newUser);

    // calls update function
    updateDOM()
}

// console.log(data);

// Function to Update the UI with DOM
function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong>NetWorth</h2>';

    // creatin div of elements for UI using ForEach loop
    inputData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong>${formatCurrency(item.worth)}`;
        //  to show element on UI
        main.appendChild(element);
    })
}

// function to fromat a number as a Currency
function formatCurrency(num) {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Event Listners for Buttons
//  1. Add User 
addUser.addEventListener('click', generateRandomUser);

// 2. Double Money
double.addEventListener('click', doubleWorth);

// 3. Sorting
sort.addEventListener('click', sortRichest);

// 4. Show MIllioniers from users
showMillioners.addEventListener('click', showMillions);

// 5. Add Calculate total wealth
calculateTotal.addEventListener('click', calculateTotalWorth);

// 6. Refresh Users
refreshUser.addEventListener('click', refresh);