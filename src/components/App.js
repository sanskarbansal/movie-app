import React, { Component } from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShow, setLoading, clearResult } from "../actions/index";
import { connect } from "./connect";
class App extends Component {
    isMovieFavourite = (movie) => {
        const { favourites } = this.props.movies;
        for (let m of favourites) {
            if (m.imdbID === movie.imdbID) return true;
        }
        return false;
    };
    handleChangeTab = (val) => {
        this.props.dispatch(setShow(val));
    };
    componentDidMount() {
        const dispatch = this.props.dispatch;
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
            movies: { list, favourites, show_favourites, loading },
            search,
        } = this.props;
        const displayList = show_favourites ? favourites : list;
        return (
            <div className="App">
                <Navbar dispatch={this.props.dispatch} {...search} />
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
                            <MovieCard dispatch={this.props.dispatch} key={1} />,
                            <MovieCard dispatch={this.props.dispatch} key={2} />,
                            <MovieCard dispatch={this.props.dispatch} key={3} />,
                        ]
                    ) : (
                        <div className="list">
                            {displayList && displayList.length ? (
                                displayList.map((movie, index) => {
                                    return (
                                        <MovieCard movie={movie} key={`movie-${index}`} dispatch={this.props.dispatch} isFav={this.isMovieFavourite(movie)} />
                                    );
                                })
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

const mapStateToProps = (state) => ({
    movies: state.main,
    search: state.search,
});

export default connect(mapStateToProps)(App);
