export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_MOVIE = "ADD_MOVIE";
export const SET_LOADING = "SET_LOADING";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const CLEAR_SEARCH_RESULT = "CLEAR_SEARCH_RESULT";

export const addMovie = (movie) => ({
    type: ADD_MOVIE,
    movie,
});
export const setLoading = (val) => ({
    type: SET_LOADING,
    val,
});
export const addMovies = (movies) => ({
    type: ADD_MOVIES,
    movies,
});
export const addFavourite = (movie) => ({
    type: ADD_FAVOURITE,
    movie,
});
export const removeFavourite = (movie) => ({
    type: REMOVE_FROM_FAVOURITES,
    movie,
});
export const setShow = (val) => {
    return {
        type: SET_SHOW_FAVOURITES,
        val,
    };
};

export const clearResult = () => ({
    type: CLEAR_SEARCH_RESULT,
});

export const addResult = (movie) => ({
    type: SET_SEARCH_RESULT,
    movie,
});

export const searchHandler = (movieName) => (dispatch) => {
    const url = `http://www.omdbapi.com/?apikey=54543ec9&t=${movieName}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Error) return alert("No such movie was found!");
            dispatch({ type: SET_SEARCH_RESULT, movie: data });
        });
};
