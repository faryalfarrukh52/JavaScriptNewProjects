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
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



// event listner means to call data from html code put it at end
form.addEventListener('submit', function(e) {
    e.preventDefault(); //it makes sure that in console page didnt reload
    //console.log(username.value); to check if form is getting data

    if (username.value === '') {
        //alert("username required"); uses to get popups msg but not a good way
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }


    if (email.value === '') {
        //alert("username required"); uses to get popups msg but not a good way
        showError(email, 'email is required');
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Invalid Email');
    } else {
        showSuccess(email);
    }


    if (password.value === '') {
        //alert("username required"); uses to get popups msg but not a good way
        showError(password, 'password is required');
    } else {
        showSuccess(password);
    }


    if (password2.value === '') {
        //alert("username required"); uses to get popups msg but not a good way
        showError(password2, 'password2 is required');
    } else {
        showSuccess(password2);
    }

})