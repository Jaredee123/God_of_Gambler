import React, { useReducer, useCallback } from 'react';
import './CreateGame.css';

function CreateGame() {
  const validator1 = (value) => {
    return value !== '' && value !== '0' && /^\d*\.?\d*$/.test(value);
  };

  const validator2 = (value) => {
    return value !== '' && /^\d*\.?\d*$/.test(value);
  };

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'Player_count_change':
        return {
          ...state,
          playerCount: {
            value: action.value,
            isValid: validator1(action.value),
          },
          inputs: {
            ...Array.from(
              { length: action.value },
              (_, i) => `Player${i + 1}`,
            ).reduce((acc, player) => {
              acc[player] = { value: '', isValid: false };
              return acc;
            }, {}),
          },
          formIsValid: false,
        };
      case 'Player_inputs_change':
        let inputsAreValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            inputsAreValid = inputsAreValid && validator2(action.value);
          } else {
            inputsAreValid = inputsAreValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: {
              value: action.value,
              isValid: validator2(action.value),
            },
          },
          formIsValid:
            inputsAreValid &&
            state.BuyInAmount.isValid &&
            state.playerCount.isValid,
        };
      case 'Buy_in_amount_change':
        let inputsAreValid2 = true;
        for (const inputId in state.inputs) {
          inputsAreValid2 = inputsAreValid2 && state.inputs[inputId].isValid;
        }
        return {
          ...state,
          BuyInAmount: {
            value: action.value,
            isValid: validator1(action.value),
          },
          formIsValid:
            inputsAreValid2 &&
            validator1(action.value) &&
            state.playerCount.isValid,
        };
      default:
        return state;
    }
  };

  const initialState = {
    BuyInAmount: { value: '', isValid: false },
    playerCount: { value: '', isValid: false },
    inputs: {},
    formIsValid: false,
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
      type: 'Buy_in_amount_change',
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
      <form className="form">
        <BuyInAmount buyinHandler={buyinHandler} />
        <PlayerCount
          playerCount={formState.playerCount.value}
          countHandler={countHandler}
        />
        <PlayerInputs
          playerCount={formState.playerCount.value}
          inputHandler={inputHandler}
        />
        <button
          type="button"
          className="btn-success"
          onClick={formSubmissionHandler}
          disabled={!formState.formIsValid}
        >
          Calculate Payment Statements
        </button>
      </form>
    </div>
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
  function generatePlayerInputs() {
    const playerInputs = [];
    for (let i = 1; i <= playerCount; i++) {
      playerInputs.push(
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
    return playerInputs;
  }
  return <>{generatePlayerInputs()}</>;
}

export default CreateGame;
