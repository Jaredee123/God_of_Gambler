import React, { useState } from 'react';
import './SearchGame.css';

function SearchGame() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery);
    // You can perform the actual search logic here, e.g., API call or filter data
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Enter player name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input"
        />
        <button
          type="submit"
          className="btn-success"
          disabled={!searchQuery.trim()}
        >
          Search Game
        </button>
      </form>
    </div>
  );
}

export default SearchGame;
