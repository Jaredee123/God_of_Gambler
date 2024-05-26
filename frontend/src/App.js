import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DataEntry from './components/DataEntry';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <DataEntry />
          </Route>
          <Route path="/results" exact>
            <Results />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
export default App;
