import { ADD_MOVIES, ADD_FAVOURITE, REMOVE_FROM_FAVOURITES, SET_SHOW_FAVOURITES, ADD_MOVIE, SET_LOADING } from "../actions/index";

const obj = {
    [ADD_MOVIE]: (state, { movie }) => ({
        ...state,
        list: [...state.list, movie],
    }),
    [ADD_MOVIES]: (state, { movies }) => ({ ...state, list: movies }),
    [ADD_FAVOURITE]: (state, { movie }) => {
        return { ...state, favourites: [...state.favourites, movie], list: state.list.filter((m) => m.imdbID !== movie.imdbID) };
    },
    [REMOVE_FROM_FAVOURITES]: (state, { movie }) => {
        return {
            ...state,
            list: [...state.list, movie],
            favourites: state.favourites.filter((m) => m.imdbID !== movie.imdbID),
        };
    },
    [SET_LOADING]: (state, { val }) => ({
        ...state,
        loading: val,
    }),
    [SET_SHOW_FAVOURITES]: (state, { val }) => {
        return {
            ...state,
            show_favourites: val,
        };
    },
};

const initialState = { list: [], favourites: [], show_favourites: false, loading: false };

const rootReducer = (state = initialState, action) => {
    if (!obj[action.type]) {
        return state;
    }
    return obj[action.type](state, action);
};

export const thunk = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action == "function") {
        action(dispatch);
        return;
    }
    next(action);
};

export default rootReducer;
