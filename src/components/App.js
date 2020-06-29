import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PageNotFound from "./PageNotFound";
import BooksPage from "./books/BooksPage";
import ManageBookPage from "./books/ManageBookPage";

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/books" component={BooksPage} />
        <Route path="/book/:slug" component={ManageBookPage} />
        <Route path="/book" component={ManageBookPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
