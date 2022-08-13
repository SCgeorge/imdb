const API_KEY = '17f2dd55-309c-4cb0-8e66-e7ba9555fafd';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getFilms(API_URL_POPULAR);

async function getFilms(url){
    const resp = await fetch(url,{
        headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
    },
    });
    const respData = await resp.json();
    showFilms(respData);
    
}

function getClassByRate(vote){
    if(vote >= 7){
        return "green";
    }
    else if(vote > 5){
        return "orange";
    }
    else {
        return "red";
    }
}

function showFilms(data){
    const moviesEl = document.querySelector(".movies");

document.querySelector(".movies").innerHTML = ""; //clearing previous films from the line

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
                        <img 
                        src = "${movie.posterUrlPreview}" 
                        class="movie__cover"
                        alt = "${movie.nameRu}"
                        />
                        <div class="movie__cover--darkened"></div>

                    </div>
                        <div class="movie__info">
                            <div class="movie__title">${movie.nameRu}</div>
                            <div class="movie__category">${movie.genres.map(
                                (genre) => `${genre.genre}`
                            )}</div>
                            ${movie.rating &&
                            `
                            <div class="movie__average movie__average--${getClassByRate(
                                movie.rating
                            )}">${movie.rating}</div>
                            `
                            }         
                            </div>
                            `;
                    moviesEl.appendChild(movieEl);
                        
                            });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if(search.value){
        getFilms(apiSearchUrl);

        search.value = "";
    }
});
//half of that API is unofficial and not working correctly, but despite on the fact that I was needed to use fake API it's working 
// site for API https://kinopoiskapiunofficial.tech/documentation/api/#/films/get_api_v2_2_films_top (registration  &  access)