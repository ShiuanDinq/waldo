import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Games from "../components/Games";
import Gameun from "../components/Gameun";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/games" exact component={Games} />
      <Route path="/games/:id" exact component={Gameun} />
    </Switch>
  </Router>
);


