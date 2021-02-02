//const var and let are variables use to store data
//document DOM means parent child relation in html code
//



const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//All Functions here
// funtion to show error

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// funtion to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

// function to check if email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `${getFieldId(input)} is not a valid email`)
    }
}

// Funtion to check if required fields have data
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value === '') {
            console.log(input.id);
            //showError(input, input.id + ' is required'); 1 way of getting message
            //showError(input, `${input.id} is required`); 2 way
            showError(input, `${getFieldId(input)} is required`); // id by cases
        } else {
            showSuccess(input);
        }
    });
}
// Function to check length of input field
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldId(input)} needs to be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldId(input)} needs to be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//Funtion to check passwords matches
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Password does not matches")
    }

}

// Funtion to check and get id of field using cases 
function getFieldId(input) {
    //return input.id.toUpperCase();
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 10);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

})