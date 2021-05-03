import React, { Component } from "react";
import data from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies } from "../actions/index";

class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.store.subscribe(() => {
            this.forceUpdate();
        });
    }

    isMovieFavourite = (movie) => {
        const { favourites } = this.store.getState();
        for (let m of favourites) {
            if (m.imdbID === movie.imdbID) return true;
        }
        return false;
    };

    componentDidMount() {
        this.store.dispatch(addMovies(data));
    }
    render() {
        const { list } = this.props.store.getState();
        // console.log(favourites);
        return (
            <div className="App">
                <Navbar />
                <div className="main">
                    <div className="tabs">
                        <div className="tab">Movies</div>
                        <div className="tab">Favourites</div>
                    </div>
                    <div className="list">
                        {list.map((movie, index) => (
                            <MovieCard movie={movie} key={`movie-${index}`} dispatch={this.store.dispatch} isFav={this.isMovieFavourite(movie)} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
