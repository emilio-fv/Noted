console.log("Script attached good to go")

// Search By Album via Spotify API
function SearchByAlbum(event) {
    event.preventDefault() // Prevent refreshing of the page when form submitted
    console.log("Submitted")
    var search_albums_form = document.getElementById('search_albums_form') // Initialize var for the search by album form
    var album_results_div = document.querySelector('#album_results')
    var form = new FormData(search_albums_form);
    fetch("http://127.0.0.1:5000/users/music/search", { method: 'POST', body: form})
    .then( response => response.json() )
    .then( data => {
        for (x in data) {
                console.log(data[x]['album_name'])
                var newElement = document.createElement("article");
                newElement.innerHTML = `
                        <p class="title mb-6 has-text-centered"><a href="/users/music/view/${data[x]['album_id']}">${data[x]['album_name']}</a></p>
                        <p class="subtitle has-text-centered">${data[x]['album_artist']}</p>
                `
                console.log(newElement)
                newElement.setAttribute("class","tile is-child box")
                album_results_div.appendChild(newElement);
            }
        })
        .catch(err => console.log(err))
}

