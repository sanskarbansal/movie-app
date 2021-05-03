import React, { Component } from "react";
import data from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
class App extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.store.subscribe(() => {
            this.forceUpdate();
        });
    }
    componentDidMount() {
        this.store.dispatch({
            type: "ADD_MOVIES",
            movies: data,
        });
    }
    render() {
        const obj = this.props.store.getState();
        console.log(obj);
        return (
            <div className="App">
                <Navbar />
                <div className="main">
                    <div className="tabs">
                        <div className="tab">Movies</div>
                        <div className="tab">Favourites</div>
                    </div>
                    <div className="list">
                        {obj.map((movie, index) => (
                            <MovieCard movie={movie} key={`movie-${index}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
