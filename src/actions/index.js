export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";

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
