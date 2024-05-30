import React, { useReducer, useCallback } from 'react';
import './DataEntry.css';

function DataEntry() {
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'Player_count_change':
        return {
          ...state,
          player_count: action.value,
          inputs: {
            ...Array.from(
              { length: action.value },
              (_, i) => `Player${i + 1}`,
            ).reduce((acc, player) => {
              acc[player] = { value: '' };
              return acc;
            }, {}),
          },
        };
      case 'Player_inputs_change':
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value },
          },
        };
      case 'BuyIn_amount_change':
        return {
          ...state,
          [action.inputId]: { value: action.value },
        };
      default:
        return state;
    }
  };

  const initialState = {
    BuyInAmount: { value: '' },
    inputs: {},
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  const inputHandler = useCallback((event) => {
    dispatch({
      type: 'Player_inputs_change',
      value: event.target.value,
      inputId: event.target.id,
    });
  }, []);

  const countHandler = useCallback((event) => {
    dispatch({
      type: 'Player_count_change',
      value: event.target.value,
    });
  }, []);

  const buyinHandler = useCallback((event) => {
    dispatch({
      type: 'BuyIn_amount_change',
      value: event.target.value,
      inputId: event.target.id,
    });
  }, []);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <div className="container">
      <Header />
      <form className="form">
        <BuyInAmount buyinHandler={buyinHandler} />
        <PlayerCount
          playerCount={formState.player_count}
          countHandler={countHandler}
        />
        <PlayerInputs
          playerCount={formState.player_count}
          inputHandler={inputHandler}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={formSubmissionHandler}
        >
          Calculate Payment Statements
        </button>
      </form>
    </div>
  );
}

function Header() {
  const appTitle = 'God of Gambling';
  return (
    <header className="header">
      <div className="logo">
        <img
          src="godofgambler_icon.png"
          height="68"
          width="68"
          alt="God of Gambling logo"
        />
        <h1>{appTitle}</h1>
      </div>
    </header>
  );
}

function BuyInAmount({ buyinHandler }) {
  return (
    <input
      className="input buyin-amount"
      id="BuyInAmount"
      type="number"
      placeholder="Buy In Amount"
      onChange={buyinHandler}
    />
  );
}

function PlayerCount({ playerCount, countHandler }) {
  return (
    <input
      className="input player-count"
      id="PlayerCount"
      type="number"
      placeholder="Number of Players"
      value={playerCount}
      onChange={countHandler}
    />
  );
}

function PlayerInputs({ playerCount, inputHandler }) {
  function generate_player_inputs() {
    const player_inputs = [];
    for (let i = 1; i <= playerCount; i++) {
      player_inputs.push(
        <input
          className="input player-input"
          key={i}
          id={`Player${i}`}
          type="number"
          placeholder={`Player ${i}`}
          onChange={inputHandler}
        />,
      );
    }
    return player_inputs;
  }
  return <>{generate_player_inputs()}</>;
}

export default DataEntry;
