import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Games from "../components/Games";
import Game from "../components/Game";
import Nav from "../components/Nav";
import Players from "../components/Players";

export default (

  <Router>
    <Nav />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/games" exact component={Games} />
      <Route path="/games/:id" exact component={Game} />
      <Route path="/games/:id/players" exact component={Players} />
    </Switch>
  </Router>
);


