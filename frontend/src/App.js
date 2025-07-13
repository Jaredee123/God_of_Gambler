import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateGame from './pages/CreateGame/CreateGame';
import SearchGame from './pages/SearchGame/SearchGame';
import LandingPage from './pages/LandingPage/LandingPage';
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
            <LandingPage />
          </Route>
          <Route path="/search-game" exact>
            <SearchGame />
          </Route>
          <Route path="/create-game" exact>
            <CreateGame />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
export default App;
