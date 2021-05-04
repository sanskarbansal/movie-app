import React, { Component } from "react";
import { searchHandler } from "../actions/index";
import MovieCard from "./MovieCard";
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
        };
    }
    handleChange = (e) => {
        this.setState({
            search: e.target.value,
        });
    };
    onSearchHandler = (e) => {
        this.props.dispatch(searchHandler(this.state.search));
    };
    render() {
        return (
            <div className="nav" onClick={(event) => event.stopPropagation()}>
                <div className="search-container">
                    <div className="search-form">
                        <input type="text" name="" id="" value={this.state.search} onChange={this.handleChange} />
                        <button id="search-btn" onClick={this.onSearchHandler}>
                            Search
                        </button>
                    </div>
                    <div className="searched--movies">
                        {this.props.results.map((movie) => (
                            <MovieCard movie={movie} searched dispatch={this.props.dispatch} key={movie.imdbID} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
