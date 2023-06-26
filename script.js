// const search = document.querySelector('.search-button');
// const keyword = document.querySelector('.input-keyword');
// search.addEventListener('click', function () {
//     fetch('http://www.omdbapi.com/?apikey=8b02a13f&s=' + keyword.value)
//         .then(response => response.json())
//         .then(response => {
//             const movies = response.Search;
//             let cards = '';
//             movies.forEach(m => cards += showCards(m));
//             const movieContainer = document.querySelector('.movie-container');
//             movieContainer.innerHTML = cards;

//             const show = document.querySelectorAll('.modal-detail-button');
//             show.forEach(m => {
//                 m.addEventListener('click', function () {
//                     const detail = this.dataset.imdbid;
//                     fetch('http://www.omdbapi.com/?apikey=8b02a13f&i=' + detail)
//                         .then(response => response.json())
//                         .then(m => {
//                             const movieDetail = showDetail(m);
//                             const showModal = document.querySelector('.modal-body');
//                             showModal.innerHTML = movieDetail;
//                         });
//                 });
//             })
//         });

// })






// Rapihin code
// fitur mencari movie
const search = document.querySelector('.search-button');
const divError = document.querySelector('.container-error');
const movieContainer = document.querySelector('.movie-container');
search.addEventListener('click', async function () {
    try {
        const keyword = document.querySelector('.input-keyword');
        const movies = await getMovie(keyword.value);
        updateUiMovie(movies);

    } catch (err) {
        const containerError = errorHandling(err);
        divError.innerHTML = containerError;
        movieContainer.innerHTML = '';
    }
});

async function getMovie(key) {
    const response = await fetch('http://www.omdbapi.com/?apikey=8b02a13f&s=' + key);
    if (response.ok === false) {
        throw new Error(response.statusText);
    }
    const response_1 = await response.json();
    if (response_1.Response === 'False') {
        throw new Error(response_1.Error);
    }
    return response_1.Search;
};

function updateUiMovie(m) {
    let cards = '';
    m.forEach(m => cards += showCards(m));
    divError.innerHTML = '';
    movieContainer.innerHTML = cards;
};

// fitur showDetail movie
// menggunakan event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUiDetailMovie(movieDetail);
    }
})

async function getMovieDetail(id) {
    const response = await fetch('http://www.omdbapi.com/?apikey=8b02a13f&i=' + id);
    const m = await response.json();
    return m;
};

function updateUiDetailMovie(m) {
    const movieDetail = showDetail(m);
    const showModal = document.querySelector('.modal-body');
    showModal.innerHTML = movieDetail;
}


// fungsi memunculkan movie dan detail movie
function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="${m.Title || 'Blank'}"/>
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtittle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
                        data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>
`;
};

function showDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid" />
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title}</h4></li>
                        <li class="list-group-item">
                            <strong>Director : </strong>${m.Director}
                        </li>
                        <li class="list-group-item">
                            <strong>Realease : </strong>${m.Released}
                        </li>
                        <li class="list-group-item">
                            <strong>Genre : </strong>${m.Genre}
                        </li>
                        <li class="list-group-item">
                            <strong>Actors : </strong>${m.Actors}
                        </li>
                        <li class="list-group-item">
                            <strong>Plot : </strong>${m.Plot}
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
`
};

function errorHandling(err) {
    return `      <div class="row">
    <div class="col">
      <div
        style="
          color: red;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;
          height: 80vh;
        "
      >
        <h1 class="error-handling">${err}</h1>
      </div>
    </div>
  </div>
`
}