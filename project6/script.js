// Get DOM ELEMENTS
const toggleNav = document.getElementById('toggle');
const apply = document.getElementById('apply');
const remove = document.getElementById('close');
const modal = document.getElementById('modal');

// Add Event Listeners and make their functions
// 1. Toggle the Nav
toggleNav.addEventListener('click', () =>
    document.body.classList.toggle('show-nav')
);

// 2. Show the Modal
apply.addEventListener('click', () =>
    modal.classList.add('show-modal')
);

// 3. Close the Modal
remove.addEventListener('click', () =>
    modal.classList.remove('show-modal')
);

// 4. Close the modal on Click outside Modal with window your full screen
window.addEventListener('click', e =>
    // ? means if modal is there then remove class show-modal : false 
    e.target === modal ? modal.classList.remove('show-modal') : false
);