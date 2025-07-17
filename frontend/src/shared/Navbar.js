import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional, if you want custom styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          God of Gambling
        </Link>
        <div className="d-flex">
          <Link to="/search-games">
            <button className="btn btn-primary mx-2">Search Games</button>
          </Link>
          <Link to="/create-game">
            <button className="btn btn-danger mx-2">Create a New Game</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
