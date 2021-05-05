import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { thunk } from "./reducers/index";
const store = createStore(rootReducer, applyMiddleware(thunk));

export const StoreContext = createContext();

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>,
    document.getElementById("root")
);
reportWebVitals();
