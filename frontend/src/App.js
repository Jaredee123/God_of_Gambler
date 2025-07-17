import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import CreateGame from './pages/CreateGame/CreateGame';
import SearchGames from './pages/SearchGames/SearchGames';
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
          <Route path="/search-games" exact>
            <SearchGames />
          </Route>
          <Route path="/create-game" exact>
            <CreateGame />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
export default App;
