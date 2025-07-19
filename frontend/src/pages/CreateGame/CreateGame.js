import React, { useReducer, useCallback, useState } from 'react';
import './CreateGame.css';

function CreateGame() {
  const MAX_PLAYERS = 22;
  const [result, setResult] = useState(null); // For popup data
  const [showPopup, setShowPopup] = useState(false);

  // Validators
  const validatorCount = (value) => {
    const num = parseInt(value, 10) || 0;
    return (
      value !== '' && /^\d+$/.test(value) && num >= 1 && num <= MAX_PLAYERS
    );
  };
  const validatorAmount1 = (value) =>
    value !== '' && value !== '0' && /^\d*\.?\d*$/.test(value);
  const validatorAmount2 = (value) => value !== '' && /^\d*\.?\d*$/.test(value);
  const validatorName = (value) => value.trim() !== '';

  // Reducer to manage dynamic maps and validity
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'Player_count_change': {
        const rawCount = parseInt(action.value, 10) || 0;
        const cappedCount = Math.min(rawCount, MAX_PLAYERS);
        const isValidCount = validatorCount(action.value);
        const names = {};
        const buyIns = {};
        const cashOuts = {};
        for (let i = 1; i <= cappedCount; i++) {
          names[`Name${i}`] = { value: '', isValid: false };
          buyIns[`BuyIn${i}`] = { value: '', isValid: false };
          cashOuts[`CashOut${i}`] = { value: '', isValid: false };
        }
        return {
          playerCount: { value: action.value, isValid: isValidCount },
          names,
          buyIns,
          cashOuts,
          formIsValid: false,
        };
      }

      case 'Name_change': {
        const names = {
          ...state.names,
          [action.inputId]: {
            value: action.value,
            isValid: validatorName(action.value),
          },
        };
        return updateValidity({ ...state, names });
      }

      case 'Buy_in_change': {
        const buyIns = {
          ...state.buyIns,
          [action.inputId]: {
            value: action.value,
            isValid: validatorAmount1(action.value),
          },
        };
        return updateValidity({ ...state, buyIns });
      }

      case 'Cash_out_change': {
        const cashOuts = {
          ...state.cashOuts,
          [action.inputId]: {
            value: action.value,
            isValid: validatorAmount2(action.value),
          },
        };
        return updateValidity({ ...state, cashOuts });
      }

      default:
        return state;
    }
  };

  // Helper to recompute formIsValid, used after any field change
  const updateValidity = (state) => {
    const namesValid = Object.values(state.names).every((n) => n.isValid);
    const buyInsValid = Object.values(state.buyIns).every((b) => b.isValid);
    const cashOutsValid = Object.values(state.cashOuts).every((c) => c.isValid);
    const sumBuy = Object.values(state.buyIns).reduce(
      (acc, b) => acc + (parseFloat(b.value) || 0),
      0,
    );
    const sumCash = Object.values(state.cashOuts).reduce(
      (acc, c) => acc + (parseFloat(c.value) || 0),
      0,
    );
    return {
      ...state,
      formIsValid:
        state.playerCount.isValid &&
        namesValid &&
        buyInsValid &&
        cashOutsValid &&
        sumBuy === sumCash,
    };
  };

  const initialState = {
    playerCount: { value: '', isValid: false },
    names: {},
    buyIns: {},
    cashOuts: {},
    formIsValid: false,
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  // Handlers
  const countHandler = useCallback((e) => {
    dispatch({ type: 'Player_count_change', value: e.target.value });
  }, []);

  const nameHandler = useCallback((e) => {
    dispatch({
      type: 'Name_change',
      inputId: e.target.id,
      value: e.target.value,
    });
  }, []);

  const buyinHandler = useCallback((e) => {
    dispatch({
      type: 'Buy_in_change',
      inputId: e.target.id,
      value: e.target.value,
    });
  }, []);

  const cashoutHandler = useCallback((e) => {
    dispatch({
      type: 'Cash_out_change',
      inputId: e.target.id,
      value: e.target.value,
    });
  }, []);

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const players = [];
    for (let i = 1; i <= displayCount; i++) {
      players.push({
        name: formState.names[`Name${i}`]?.value || '',
        buyIn: Number(formState.buyIns[`BuyIn${i}`]?.value || 0),
        cashOut: Number(formState.cashOuts[`CashOut${i}`]?.value || 0),
      });
    }

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ players }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || 'Failed to create game');
      } else {
        // Extract from data.game
        setResult({
          settledAt: data.settledAt,
          players: data.players,
          settlements: data.settlements,
        });
        setShowPopup(true);
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  // Compute display count and sums for UI
  const displayCount = Math.min(
    parseInt(formState.playerCount.value, 10) || 0,
    MAX_PLAYERS,
  );
  const sumBuy = Object.values(formState.buyIns).reduce(
    (acc, b) => acc + (parseFloat(b.value) || 0),
    0,
  );
  const sumCash = Object.values(formState.cashOuts).reduce(
    (acc, c) => acc + (parseFloat(c.value) || 0),
    0,
  );
  const sumMismatch = displayCount > 0 && sumBuy !== sumCash;

  return (
    <div className="container">
      <form className="form" onSubmit={formSubmissionHandler}>
        {/* Player count input */}
        <input
          className="input player-count"
          id="PlayerCount"
          type="number"
          placeholder="Enter number of players"
          min="2"
          max={MAX_PLAYERS}
          step="1"
          value={formState.playerCount.value}
          onChange={countHandler}
        />
        {!formState.playerCount.isValid &&
          formState.playerCount.value !== '' && (
            <p className="error">Enter a number between 2 and {MAX_PLAYERS}</p>
          )}

        {/* Sum validation feedback */}
        {sumMismatch && (
          <p className="error">
            Total Buy-Ins ({sumBuy}) must equal Total Cash-Outs ({sumCash})
          </p>
        )}

        {/* Dynamic player groups */}
        {Array.from({ length: displayCount }, (_, i) => {
          const idx = i + 1;
          return (
            <div key={idx} className="player-group">
              <input
                className="input name-input"
                id={`Name${idx}`}
                type="text"
                placeholder={`Player ${idx} Name`}
                value={formState.names[`Name${idx}`]?.value || ''}
                onChange={nameHandler}
              />
              <input
                className="input buyin-input"
                id={`BuyIn${idx}`}
                type="number"
                placeholder={`Player ${idx} Buy-In`}
                value={formState.buyIns[`BuyIn${idx}`]?.value || ''}
                onChange={buyinHandler}
              />
              <input
                className="input cashout-input"
                id={`CashOut${idx}`}
                type="number"
                placeholder={`Player ${idx} Cash-Out`}
                value={formState.cashOuts[`CashOut${idx}`]?.value || ''}
                onChange={cashoutHandler}
              />
            </div>
          );
        })}

        {/* Submission button disabled when invalid or sums mismatch */}
        <button
          type="submit"
          className="btn-success"
          disabled={!formState.formIsValid || sumMismatch}
        >
          Calculate Payment Statements
        </button>
      </form>

      {/* Popup overlay for result */}
      {showPopup && result && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <h3>Game Created!</h3>
            <div>
              <strong>Settled At:</strong>{' '}
              {result.settledAt
                ? new Date(result.settledAt).toLocaleString()
                : 'N/A'}
            </div>
            <div className="section-spacing">
              <strong>Players:</strong>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Buy-In</th>
                    <th scope="col">Cash-Out</th>
                  </tr>
                </thead>
                <tbody>
                  {(result.players || []).map((p, i) => (
                    <tr>
                      <td>{p.name}</td>
                      <td>{p.buyIn}</td>
                      <td>{p.cashOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.settlements && result.settlements.length > 0 && (
              <div className="section-spacing">
                <strong>Settlements:</strong>
                <ul>
                  {result.settlements.map((s, i) => (
                    <li key={i}>
                      {s.from} pays {s.to}: {s.amount}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGame;
