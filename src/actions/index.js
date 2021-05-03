const rootReducer = (state = [], action) => {
    if (action.type === "ADD_MOVIES") {
        return action.movies;
    }
    return state;
};
export default rootReducer;
