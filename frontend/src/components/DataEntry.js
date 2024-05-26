import React, { useState, useReducer, useCallback, useEffect } from 'react';

function DataEntry() {
  const [player_count, setplayer_count] = useState('4');
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value },
          },
        };
      default:
        return state;
    }
  };
  const initialState = {
    inputs: {
      BuyInAmount: { value: '' },
      ...Array.from(
        { length: player_count },
        (_, i) => `Player${i + 1}`,
      ).reduce((acc, player) => {
        acc[player] = { value: '' };
        return acc;
      }, {}),
    },
  };
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const inputHandler = useCallback((id, value) => {
    dispatch({
      type: 'CHANGE',
      value: value,
      inputId: id,
    });
  }, []);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <>
      <Header />
      <form>
        <BuyInAmount onChange={inputHandler} />
        <PlayerCount
          player_count={player_count}
          setplayer_count={setplayer_count}
        />
        <PlayerInputs player_count={player_count} />
        <button onClick={formSubmissionHandler}>
          Calculate Payment Statements
        </button>
      </form>
    </>
  );
}

function Header() {
  const appTitle = 'God of Gambling';
  return (
    <header>
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

function BuyInAmount({ inputHandler }) {
  return (
    <input
      id="BuyInAmount"
      type="number"
      placeholder="Buy In Amount"
      onChange={inputHandler}
    />
  );
}

function PlayerCount({ player_count, setplayer_count }) {
  return (
    <input
      id="PlayerCount"
      type="number"
      placeholder="Number of Players"
      value={player_count}
      onChange={(e) => setplayer_count(e.target.value)}
    />
  );
}

function PlayerInputs({ player_count, inputHandler }) {
  function generate_player_inputs() {
    const player_inputs = [];
    for (let i = 1; i <= player_count; i++) {
      player_inputs.push(
        <input
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
