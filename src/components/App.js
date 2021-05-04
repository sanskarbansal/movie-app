import React, { Component } from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShow, setLoading, clearResult } from "../actions/index";

class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    isMovieFavourite = (movie) => {
        const {
            main: { favourites },
        } = this.store.getState();
        for (let m of favourites) {
            if (m.imdbID === movie.imdbID) return true;
        }
        return false;
    };
    handleChangeTab = (val) => {
        this.store.dispatch(setShow(val));
    };
    componentDidMount() {
        const dispatch = this.store.dispatch;
        const url = "http://www.omdbapi.com/?apikey=54543ec9&";
        dispatch(setLoading(true));
        fetch(url + "s=Batman&page=1&plot=short")
            .then((data) => data.json())
            .then((data) => {
                const searchResult = data.Search;
                let promises = [];
                let movies = [];
                for (let mov of searchResult) {
                    promises.push(
                        fetch(url + "i=" + mov.imdbID)
                            .then((response) => response.json())
                            .then((movie) => movies.push(movie))
                            .catch((err) => console.log(err))
                    );
                }
                Promise.all(promises).then(() => {
                    dispatch(addMovies(movies));
                    dispatch(setLoading(false));
                });
            });
        window.addEventListener("click", (event) => {
            dispatch(clearResult());
        });
    }
    render() {
        const {
            main: { list, favourites, show_favourites, loading },
            search,
        } = this.props.store.getState();
        const displayList = show_favourites ? favourites : list;
        return (
            <div className="App">
                <Navbar dispatch={this.store.dispatch} {...search} />
                <div className="main">
                    <div className="tabs">
                        <div className={`tab ${show_favourites ? "" : "active"}`} onClick={() => this.handleChangeTab(false)}>
                            Movies
                        </div>
                        <div className={`tab ${show_favourites ? "active" : ""}`} onClick={() => this.handleChangeTab(true)}>
                            Favourites
                        </div>
                    </div>
                    {loading ? (
                        [
                            <MovieCard dispatch={this.store.dispatch} key={1} />,
                            <MovieCard dispatch={this.store.dispatch} key={2} />,
                            <MovieCard dispatch={this.store.dispatch} key={3} />,
                        ]
                    ) : (
                        <div className="list">
                            {displayList && displayList.length ? (
                                displayList.map((movie, index) => (
                                    <MovieCard movie={movie} key={`movie-${index}`} dispatch={this.store.dispatch} isFav={this.isMovieFavourite(movie)} />
                                ))
                            ) : (
                                <div> List is empty. </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
