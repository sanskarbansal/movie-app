import React, { Component } from "react";
import { addFavourite, addMovie, clearResult, removeFavourite } from "../actions/index";

export default class MovieCard extends Component {
    toggleFav = (movie) => {
        if (this.props.isFav === true) {
            this.props.dispatch(removeFavourite(movie));
            return;
        }
        this.props.dispatch(addFavourite(movie));
    };

    handleAddMovies = () => {
        this.props.dispatch(addMovie(this.props.movie));
        this.props.dispatch(clearResult());
    };
    render() {
        const { movie, isFav, searched } = this.props;
        // console.log(this.props);
        return !movie ? (
            <div className="movie-card m-h">
                <div className="left lazyloader"></div>
                <div className="right ">
                    <div className="plot lazyloader"></div>
                    <div className="footer lazyloader"></div>
                </div>
            </div>
        ) : (
            <div className={`movie-card ${searched ? "searched-card" : "m-h"}`}>
                <div className="left">
                    <img src={movie.Poster} alt="movie-poster" />
                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className="rating">{movie.imdbRating}</div>
                        {searched ? (
                            <button className="favourite-btn" onClick={this.handleAddMovies}>
                                ADD TO MOVIES
                            </button>
                        ) : (
                            <button className={`favourite-btn ${isFav ? "fav" : ""}`} onClick={() => this.toggleFav(movie)}>
                                {isFav ? "Unfavourite" : "Favourite"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
