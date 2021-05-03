import React, { Component } from "react";
import { addFavourite, removeFavourite } from "../actions/index";

export default class MovieCard extends Component {
    toggleFav = (movie) => {
        if (this.props.isFav === true) {
            this.props.dispatch(removeFavourite(movie));
            return;
        }
        this.props.dispatch(addFavourite(movie));
    };
    render() {
        const { movie, isFav } = this.props;
        return !movie ? (
            <div className="movie-card">
                <div className="left lazyloader">{/* <img alt="movie-poster" /> */}</div>
                <div className="right ">
                    <div className="plot lazyloader"></div>
                    <div className="footer lazyloader"></div>
                </div>
            </div>
        ) : (
            <div className="movie-card">
                <div className="left">
                    <img src={movie.Poster} alt="movie-poster" />
                </div>
                <div className="right">
                    <div className="title">{movie.Title}</div>
                    <div className="plot">{movie.Plot}</div>
                    <div className="footer">
                        <div className="rating">{movie.imdbRating}</div>
                        <button className={`favourite-btn ${isFav ? "fav" : ""}`} onClick={() => this.toggleFav(movie)}>
                            {isFav ? "Unfavourite" : "Favourite"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
