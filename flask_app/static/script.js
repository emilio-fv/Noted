console.log("Script attached good to go") // Test Script Connection

function submitMusicForm(event) { // Spotify API - Music Search 
    event.preventDefault();
    var music_search_form = document.getElementById('music_search_form');
    var music_search_results = document.querySelector('#music_search_results');
    var music_search_category = document.getElementById('music_search_category').value;
    clearDiv(music_search_results);
    var form = new FormData(music_search_form);


    searchSpotify(form).then( data => {
        for (row in data) {
            var newElement = document.createElement("div");
            if (music_search_category === "album") {
                newElement.innerHTML = 
                    `<a href="/users/music/view/${ data[row]['album_id']}">
                        <div class="card-image">
                            <figure class="image">
                                <img src="${ data[row]['album_img'] }" alt="Album Cover">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                            <div class="media-content has-text-centered">
                                <p class="title is-4">${ data[row]['album_name'] }</p>
                                <p class="subtitle is-6">${ data[row]['artist_name'] }</p>
                            </div>
                            </div>
                    </a>`
            }
            if (music_search_category === "track") {
                newElement.innerHTML = 
                    `<a href="#">
                        <div class="card-image">
                            <figure class="image">
                                <img src="${ data[row]['album_img'] }" alt="Album Cover">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                            <div class="media-content has-text-centered">
                                <p class="title is-4">${ data[row]['track_name'] }</p>
                                <p class="subtitle is-6">${ data[row]['album_name'] }</p>
                                <p class="subtitle is-6">${ data[row]['artist_name'] }</p>
                            </div>
                            </div>
                    </a>`
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
                    </a>`
            }
            newElement.setAttribute("class","column is-one-quarter card");
            music_search_results.appendChild(newElement);
        }})
        .catch( err => console.log(err) )
}

function clearDiv(element) { // Clear Element
    while(element.firstElementChild) {
        element.firstElementChild.remove();
    }
}

async function searchSpotify(form_data) { 
    let response = await fetch("http://127.0.0.1:5000/users/music/search", { method: 'POST', body: form_data});
    let data = await response.json();
    return data;
}