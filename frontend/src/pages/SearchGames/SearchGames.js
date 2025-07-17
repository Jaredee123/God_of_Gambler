import React, { useState } from 'react';
import './SearchGames.css';

function SearchGames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState(''); // Track last submitted query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setGames([]);
    setSubmittedQuery(searchQuery); // Set submitted query here
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
      {games.length === 0 && submittedQuery && !error && (
        <div className="results">No games found for "{submittedQuery}".</div>
      )}
      {games.length > 0 && (
        <div className="results">
          <h3>Games for "{submittedQuery}":</h3>
          {games.map((game, idx) => (
            <div key={idx} className="game-block">
              <div>
                <strong>Settled At:</strong>{' '}
                {game.settledAt
                  ? new Date(game.settledAt).toLocaleString()
                  : 'N/A'}
              </div>
              <div className="section-spacing">
                <strong>Players:</strong>
                <ul>
                  {game.players.map((p, i) => (
                    <li key={i}>
                      {p.name} | Buy-In: {p.buyIn} | Cash-Out: {p.cashOut}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="section-spacing">
                <strong>Settlements:</strong>
                <ul>
                  {game.settlements.map((s, i) => (
                    <li key={i}>
                      {s.from} pays {s.to}: {s.amount}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchGames;
