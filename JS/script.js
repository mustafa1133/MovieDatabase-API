$(document).ready(() => {      //arrow function instead of function to keep it ES6 executes when ready
    $('#clickForm').on('click', (e) => { // listen for event and call back function
    let Clickbtnn =$('#clickForm');
    getMovies(Clickbtnn);

    });// used to capture the user input once they search for something
});

basePath="https://image.tmdb.org/t/p/w500"; //basepath for the movie poster

function getMovies(Clickbtnn){
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=f80123cbed782ee2b9035054ee0a01ba&language=en-US&page=') // Sends get request to API
    .then((response) =>{ // sends a post request
    console.log(response);
    let movies = response.data.results; //Ajax request gets the data of the object
    let output=''; // used to created the javascript generated HTML
    $.each(movies, (index, data) =>{ // jquery foreach loop to iterate each movie
        output+=`
        <div class="col-md-3">
            <div class="well text-center">
            <img src="${basePath+ data.poster_path}">
            <h6>${data.title}</h6>
            <a onclick="movieSelected('${data.id}')" class="btn btn-primary btn-sm" href="#">Movie Details</a> 
            </div>
        </div>
        `;
        // on click calls a function called moviesselected

});

$('#movies').html(output); // jquery used to output the output to the #movies id container
})
}
function movieSelected(id){
    localStorage.setItem('movieId', id); //sets movie Id to the variable id and stores ID in the local storage
    window.location = 'movie.html'; //changes pages to movie.html file
  }
  
  function getMovie(){
    let movieId = localStorage.getItem('movieId');
    // Make a request for a user with a given ID
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=f80123cbed782ee2b9035054ee0a01ba") // makes a request to search by ID
      .then(function (response) {
      let movie = response.data;
      //console.log(movie);
      let output = `
          <div class="row">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
                <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.overview}
              <hr>
              <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-primary">Go Back To Movies</a>
            </div>
          </div>
      `;
      $('#movie').html(output); // jquery outputs the output to the movie html page
      })
    }