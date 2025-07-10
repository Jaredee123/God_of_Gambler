import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateGame from './pages/CreateGame/CreateGame';
import SearchGame from './pages/SearchGame/SearchGame';
import Navbar from './shared/Navbar';
import Header from './shared/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <CreateGame />
          </Route>
          <Route path="/game" exact>
            <SearchGame />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
export default App;
