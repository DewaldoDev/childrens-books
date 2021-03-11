import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDisplay from "./components/BookDisplay";

const App = () => (
  <Router>
    <Switch>
      <Route path="/book/:bookId">
        <BookDisplay />
      </Route>
      <Route path="/">
        <BookList />
      </Route>
    </Switch>
  </Router>
);

ReactDom.render(<App />, document.getElementById("app"));
