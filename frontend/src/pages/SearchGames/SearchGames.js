import React, { useState } from 'react';
import './SearchGames.css';

function SearchGames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setGames([]);
    setSubmittedQuery(searchQuery);
    setLoading(true); // Set loading to true when the request is made

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}?player=${encodeURIComponent(
          searchQuery,
        )}`,
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
    } finally {
      setLoading(false); // Set loading to false after the response is received
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
      {/* Only show the results div after data is fetched and not in a loading state */}
      {!loading && games.length === 0 && submittedQuery && !error && (
        <div className="results">No games found for "{submittedQuery}".</div>
      )}
      {!loading && games.length > 0 && submittedQuery && !error && (
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
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Buy-In</th>
                      <th scope="col">Cash-Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {game.players.map((p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.buyIn}</td>
                        <td>{p.cashOut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {game.settlements && game.settlements.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading results, please wait...</p>
        </div>
      )}
    </div>
  );
}

export default SearchGames;
