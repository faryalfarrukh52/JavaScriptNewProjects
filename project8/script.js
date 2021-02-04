// Getting DOM Elememts
const submit = document.getElementById('submit');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const meal = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');
const searchBtn = document.getElementById('search');
const refreshBtn = document.getElementById('refresh');

// Funtion to search meal from API and fetch the data
function searchMeal(e) {
    // e.preventDefault() uses to avoid loading the page while submitting
    e.preventDefault();
    resultHeading.innerHTML = '';

    // Clear Selected data meal from the page
    selectedMeal.innerHTML = '';


    // Get the search term from input field
    const term = searchBtn.value;
    // console.log(term);

    // Check if search term exist if Yes then fetch data from API
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // display search result
                resultHeading.innerHTML = `<h2>Search results for '${term}' :</h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results for '${term}'. Please search with different word.</p>`
                } else {
                    // Displaying search results
                    meal.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>
                    
                    `)
                        // converting map array into string
                        .join('')
                }
            })
    } else {
        alert('Please enter the right meal.')
    }

    // Clear search term
    searchBtn.value = '';
}

// Function to get meal data from API
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            //  to get from 0 object from array of meal
            const meal = data.meals[0];

            addMealToDOM(meal);
        })
}

// Function to add a meal to DOM
function addMealToDOM(meal) {

    // make const of empty array
    const ingrediants = [];
    // push data of ingrediants and measurement from API into empty array usinf for loop
    for (let i = 1; i <= 20; i++) {
        // if meal in API contains str ingrediant then fetch data of ing and measure
        if (meal[`strIngredient${i}`]) {
            ingrediants.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            
        }else {
            break;
        }
        
    };

// Dispalying Meals Info Data into the page
selectedMeal.innerHTML = `
<div class="selected-meal">
<h3>Search results for ${meal.strMeal}:</h3>
<h1>${meal.strMeal}</h1>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
<div class="selected-meal-info">
${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
</div>
<div class="main">
<p>${meal.strInstructions}</p>
<h2>Ingredients</h2>
<ul>
${ingrediants.map( ingredient => `<li>${ingredient}</li>`) .join('')}
</ul>
</div>
</div>`;
}



// Function to Random Meal Search and fetch data from API
function randomMeal(e) {
    e.preventDefault();
    resultHeading.innerHTML = '';

    // Clear Selected data meal from the page
    selectedMeal.innerHTML = '';

    const random = randomBtn.value;
    // Fetch random meal data from API
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
    
    addMealToDOM(meal);
})
};



// Event Listeners
// 1 Submit 
submit.addEventListener('submit', searchMeal)

// 2. When clickina a Meal
meal.addEventListener('click', e => {
    resultHeading.innerHTML = '';
    meal.innerHTML= '';
    const mealInfo = e.path.find(item => {
        // console.log(item);
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    // console.log(mealInfo);
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        // console.log(mealID);
        // Function to get meal by id
        getMealByID(mealID);
    }
});

// 3. Random Meal Searching Event
randomBtn.addEventListener('click', randomMeal);


refreshBtn.addEventListener('click', refresh);

function refresh(){
    selectedMeal.innerHTML = '';
    meal.innerHTML= '';
    resultHeading.innerHTML = `
    <div id="result-heading" class="image">
    <img src="images/recipe-27720_Large600_ID-1540466.jpg" alt="">
    <img src="images/2012-06-29-01-735x551.jpg" alt="">
    <img src="images/download.jpeg" alt="">
    <img src="images/file-20181206-128208-1lepxpi.jpg" alt="">
</div>
    `;
}