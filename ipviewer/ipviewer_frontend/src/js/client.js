import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import setIP from "./pages/setIP";
import Layout from "./pages/Layout";
import ReloadIP from "./pages/ReloadIP";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={setIP}></IndexRoute>
      <Route path="reloadip" component={ReloadIP}></Route>
    </Route>
  </Router>,
app);
