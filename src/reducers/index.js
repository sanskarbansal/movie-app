import { ADD_MOVIES, ADD_FAVOURITE, REMOVE_FROM_FAVOURITES } from "../actions/index";

const obj = {
    [ADD_MOVIES]: (state, action) => ({ ...state, list: action.movies }),
    [ADD_FAVOURITE]: (state, action) => {
        return { ...state, favourites: [...state.favourites, action.movie] };
    },
    [REMOVE_FROM_FAVOURITES]: (state, action) => {
        return {
            ...state,
            favourites: state.favourites.filter((movie) => movie.imdbID !== action.movie.imdbID),
        };
    },
};
const rootReducer = (state = { list: [], favourites: [] }, action) => {
    if (!obj[action.type]) {
        return state;
    }
    return obj[action.type](state, action);
};
export default rootReducer;
