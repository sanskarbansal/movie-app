import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { thunk } from "./reducers/index";
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<App store={store} />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
