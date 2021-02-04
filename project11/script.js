// gettiing elements from DOM
const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const postLoader = document.getElementById('loader');

// Default values
let limit = 5;
let page = 1;

// Function to get posts from API
async function getPosts() {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    // convert data into json
    const data = await res.json();

    // return data
    return data;
}

// Function to show post after fetching data
// async function is used when we get or post data
async function showPosts() {
    const posts = await getPosts();
    // console.log(posts);

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <hr>
            <p class="post-body">
            ${post.body}   
            </p>
        </div>
        `;
        // make data visible on DOM
        postContainer.appendChild(postElement);

    });
}

// Function to show loader after scrollinh the page 
function showLoader() {
    postLoader.classList.add('show');

    // hide loader after 1 sec
    setTimeout(() => {
        postLoader.classList.remove('show');
        // new posts reload
        setTimeout(() => {
            page++;
            showPosts();

        }, 300);


    }, 1000);
}

// Function to filter posts
function filterPost(e) {
    const filterTerm = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    // console.log(posts);
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(filterTerm) > -1 || body.indexOf(filterTerm) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })

}

// display the initially fetched API data
showPosts();

// Event Handlers
// 1. Create Event Handler for Page Scroll
window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
        showLoader();
    }
});

// filter Posts that are already fetched
filter.addEventListener('input', filterPost);