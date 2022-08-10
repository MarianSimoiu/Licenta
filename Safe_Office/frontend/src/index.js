import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { Helmet } from "react-helmet";

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
    <style>{"body { background-image: linear-gradient(to right, rgb(51, 102, 255) ,rgb(204, 255, 204))"}</style>
    </Helmet>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
