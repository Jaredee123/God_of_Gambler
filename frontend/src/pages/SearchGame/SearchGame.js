import React, { useState } from 'react';
import './SearchGame.css';

function SearchGame() {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setGames([]);
    try {
      const response = await fetch(
        `http://localhost:4000/games?player=${encodeURIComponent(searchQuery)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to fetch games');
      } else {
        setGames(data);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
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
      {error && <div className="error">{error}</div>}
      {games.length > 0 && (
        <div className="results">
          <h3>Games for "{searchQuery}":</h3>
          <pre>{JSON.stringify(games, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SearchGame;
