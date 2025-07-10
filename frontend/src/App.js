import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DataEntry from './pages/CreateGame';
import Results from './pages/ListGame';
import Header from './shared/Header';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <DataEntry />
          </Route>
          <Route path="/game" exact>
            <Results />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
export default App;
