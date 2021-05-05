import {
    ADD_MOVIES,
    ADD_FAVOURITE,
    REMOVE_FROM_FAVOURITES,
    SET_SHOW_FAVOURITES,
    ADD_MOVIE,
    SET_LOADING,
    SET_SEARCH_RESULT,
    CLEAR_SEARCH_RESULT,
} from "../actions/index";

const mainReducerHelper = {
    [ADD_MOVIE]: (state, { movie }) => ({
        ...state,
        list: [movie, ...state.list],
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
    [SET_LOADING]: (state, { val }) => {
        return {
            ...state,
            loading: val,
        };
    },
    [SET_SHOW_FAVOURITES]: (state, { val }) => {
        return {
            ...state,
            show_favourites: val,
        };
    },
};

const initialState = {
    main: { list: [], favourites: [], show_favourites: false, loading: false },
    search: { show_search: false, results: [] },
};

const mainReducer = (state = initialState.main, action) => {
    if (mainReducerHelper[action.type]) return mainReducerHelper[action.type](state, action);
    return state;
};
const searchReducer = (state = initialState.search, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULT:
            return {
                ...state,
                show_search: true,
                results: [...action.movies.Search],
            };
        case CLEAR_SEARCH_RESULT:
            return {
                ...state,
                show_search: false,
                results: [],
            };
        default:
            return state;
    }
};

const rootReducer = (state = initialState, action) => ({
    main: mainReducer(state.main, action),
    search: searchReducer(state.search, action),
});

export const thunk = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action == "function") {
        action(dispatch);
        return;
    }
    next(action);
};

export default rootReducer;
