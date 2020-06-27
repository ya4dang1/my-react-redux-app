import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./redux/configureStore";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
