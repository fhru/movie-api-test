function searchMovie() {
    $('#movie-list').html('');
    $.ajax({
        url: 'https://omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '90aed0fb',
            's': $('#search-input').val()
        },
        success: function (data) {
            if (data.Response == "True") {
                let movies = data.Search

                $.each(movies, function (i, data) {
                    let poster = ''
                    if (data.Poster === "N/A") {
                        poster = "img/default.jpg"
                    } else {
                        poster = data.Poster
                    }
                    $('#movie-list').append(`
                        <div class="col-lg-4">
                            <div class="card">
                                <img src="`+ poster + `" class="card-img-top img-fluid">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title + `</h5>
                                    <p class="card-text">Type: `+ data.Type + `</p>
                                    <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID + `">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `)
                })

                $('#search-input').val('')

            } else {
                $('#movie-list').html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>`+ data.Error + `</strong> You should check in on some of those fields below.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `)
            }
        }
    })
}

$('#search-button').on('click', function () {
    searchMovie();
})

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) { // bila tombol enter ditekan
        searchMovie();
    }
})

// ini gabisa karena .see-detail tidak muncul diawal
// makanya kita harus memanggil parentnya lalu disamping klik baru dikasih targetnya
$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'https://omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '90aed0fb',
            'i': $(this).data('id')
        },
        success: function (mov) {
            let poster = ''
            if (mov.Poster === "N/A") {
                poster = "img/default.jpg"
            } else {
                poster = mov.Poster
            }
            if (mov.Response === 'True') {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-4">
                                <img src="`+ poster + `" class="img-fluid">
                            </div>
                            <div class="col-lg-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><span class="fs-1 fw-bolder">`+ mov.Title + `</span></li>
                                    <li class="list-group-item"><span class="fw-bolder">Released
                                            on: </span>`+ mov.Released + `</li>
                                    <li class="list-group-item"><span class="fw-bolder">Movie Length: 
                                        </span>`+ mov.Runtime + `
                                    <li class="list-group-item"><span class="fw-bolder">Genre: </span>`+ mov.Genre + `</li>
                                    </li>
                                    <li class="list-group-item"><span class="fw-bolder">Actors: </span>`+ mov.Actors + `</li>
                                    <li class="list-group-item"><span class="fw-bolder">IMDB Ratings: </span>`+ mov.imdbRating + `</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)

            } else {
                $('.modal-body').html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>`+ mov.Error + `</strong> You should check in on some of those fields below.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `)
            }
        }
    })
})