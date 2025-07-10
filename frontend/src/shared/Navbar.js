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
          <Link to="/game">
            <button className="btn btn-primary mx-2">Search Game</button>
          </Link>
          <Link to="/">
            <button className="btn btn-success mx-2">Create a New Game</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
