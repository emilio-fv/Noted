// Test Script Connection
console.log("Script attached good to go") 

// Search Music
function submitMusicForm(event) { 
    event.preventDefault();

    var music_search_form = document.getElementById('music_search_form');
    var music_search_results = document.querySelector('#music_search_results');
    var music_search_category = document.getElementById('music_search_category').value;
    
    clearDiv(music_search_results); 
    
    var form = new FormData(music_search_form);

    searchSpotify(form)
        .then( data => {
            for (row in data) {
                var newElement = document.createElement("div");
                if (music_search_category === "album") {
                    newElement.innerHTML = 
                        `<div class="card">
                            <div class="card-image">
                                <figure class="image">
                                    <a href="/music/view/${ data[row]['album_id']}">
                                        <img src="${ data[row]['album_img'] }" alt="Album cover">
                                    </a>
                                </figure>
                                <header class="card-header is-flex is-flex-direction-column	is-align-items-center py-3">
                                    <p class="is-size-4">${ data[row]['album_name'] }</p>
                                    <p class="is-size-5">${ data[row]['artist_name'] }</p>
                                </header>
                            </div>
                        </div>`
                }
                if (music_search_category === "track") {
                    newElement.innerHTML = 
                        `<div class="card">
                            <div class="card-image">
                                <figure class="image">
                                    <a href="/music/view/${ data[row]['album_id']}">
                                        <img src="${ data[row]['album_img'] }" alt="Album cover">
                                    </a>
                                </figure>
                                <header class="card-header is-flex is-flex-direction-column	is-align-items-center py-3">
                                    <p class="is-size-4">${ data[row]['track_name'] }</p>
                                    <p class="is-size-5">${ data[row]['artist_name'] }</p>
                                </header>
                            </div>
                        </div>`
                }
                if (music_search_category === "artist") {
                    newElement.innerHTML = 
                        `<a href="#">
                            <div class="card-image">
                                <figure class="image">
                                    <img src="${ data[row]['artist_img'] }" alt="Artist Headshot">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content has-text-centered">
                                        <p class="title is-4">${ data[row]['artist_name'] }</p>
                                    </div>
                                </div>
                            </div>
                        </a>`
                }
                newElement.setAttribute("class","column is-one-quarter p-6 review-card");
                music_search_results.appendChild(newElement);
            }})
        .catch( err => console.log(err) )
}

// Search Users
function submitUserForm(event) { 
    event.preventDefault();
    var user_search_form = document.getElementById("user_search_form");
    var user_search_results = document.getElementById("user_search_results");
    var user_search_category = document.getElementById("user_search_category").value;

    clearDiv(user_search_results);

    var form = new FormData(user_search_form);

    searchUsers(form)
        .then( data => {
            for (row in data) {
                var newElement = document.createElement("div");
                newElement.innerHTML = 
                `<div class="card">
                    <a href="/users/view/${ data[row]['id'] }">
                        <div class="card-image">
                            <figure class="image px-6 py-3">
                                <img src="../static/img/avatar.png" alt="User avatar">
                            </figure>
                            <header class="card-header is-flex is-flex-direction-column	is-align-items-center py-3">
                                <p class="is-size-4">${ data[row]['username'] }</p>
                                <p class="is-size-5">User since: ${ data[row]['created_at'] }</p>
                            </header>
                        </div>
                    </a>
                </div>`;
                newElement.setAttribute("class","column is-one-quarter p-6 user-card");
                user_search_results.appendChild(newElement);
            }
        })
        .catch( err => console.log(err))
}

// Search Reviews
function submitReviewSearchForm(event) {
    event.preventDefault();
    var review_search_form = document.getElementById("review_search_form");
    var review_search_results = document.getElementById("review_search_results");
    
    clearDiv(review_search_results);

    var form = new FormData(review_search_form);

    searchReviews(form)
        .then( data => {
            for (row in data) {
                var newElement = document.createElement("div");
                newElement.innerHTML = `
                `;
                newElement.setAttribute();
                review_search_results.appendChild(newElement);
            }
        })
        .catch( err => console.log(err))
}

// Clear html element
function clearDiv(element) { // Clear Element
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

// Spotify API Call
async function searchSpotify(form_data) { 
    let response = await fetch("/music/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}

// User DB API Call
async function searchUsers(form_data) {
    let response = await fetch("/users/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}

// Review DB API Call
async function searchReviews(form_data) {
    let response = await fetch("/reviews/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}

// Toggle navbar menu
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });