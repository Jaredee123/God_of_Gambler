import React, { useReducer, useCallback } from 'react';
import './CreateGame.css';

function CreateGame() {
  // Validators
  const validator1 = (value) => value !== '' && value !== '0' && /^\d*\.?\d*$/.test(value);
  const validator2 = (value) => value !== '' && /^\d*\.?\d*$/.test(value);

  // Reducer to manage players and buy-ins dynamically
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'Player_count_change': {
        const count = parseInt(action.value, 10) || 0;
        const isValidCount = validator1(action.value);
        // Initialize inputs and buy-ins based on count
        const inputs = {};
        const buyIns = {};
        for (let i = 1; i <= count; i++) {
          inputs[`Player${i}`] = { value: '', isValid: false };
          buyIns[`BuyIn${i}`] = { value: '', isValid: false };
        }
        return {
          playerCount: { value: action.value, isValid: isValidCount },
          inputs,
          buyIns,
          formIsValid: false,
        };
      }
      case 'Player_inputs_change': {
        const inputs = {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: validator2(action.value),
          },
        };
        const inputsValid = Object.values(inputs).every((inp) => inp.isValid);
        const buyInsValid = Object.values(state.buyIns).every((b) => b.isValid);
        return {
          ...state,
          inputs,
          formIsValid: inputsValid && buyInsValid && state.playerCount.isValid,
        };
      }
      case 'Buy_in_change': {
        const buyIns = {
          ...state.buyIns,
          [action.inputId]: {
            value: action.value,
            isValid: validator1(action.value),
          },
        };
        const inputsValid = Object.values(state.inputs).every((inp) => inp.isValid);
        const buyInsValid = Object.values(buyIns).every((b) => b.isValid);
        return {
          ...state,
          buyIns,
          formIsValid: inputsValid && buyInsValid && state.playerCount.isValid,
        };
      }
      default:
        return state;
    }
  };

  // Initial state
  const initialState = {
    playerCount: { value: '', isValid: false },
    inputs: {},
    buyIns: {},
    formIsValid: false,
  };

  const [formState, dispatch] = useReducer(formReducer, initialState);

  // Handlers
  const countHandler = useCallback((e) => {
    dispatch({ type: 'Player_count_change', value: e.target.value });
  }, []);

  const inputHandler = useCallback((e) => {
    dispatch({
      type: 'Player_inputs_change',
      value: e.target.value,
      inputId: e.target.id,
    });
  }, []);

  const buyinHandler = useCallback((e) => {
    dispatch({
      type: 'Buy_in_change',
      value: e.target.value,
      inputId: e.target.id,
    });
  }, []);

  const formSubmissionHandler = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={formSubmissionHandler}>
        {/* Player count input */}
        <input
          className="input player-count"
          id="PlayerCount"
          type="number"
          placeholder="Number of Players"
          value={formState.playerCount.value}
          onChange={countHandler}
        />

        {/* Dynamic player and buy-in inputs */}
        {Array.from({ length: Number(formState.playerCount.value) }, (_, i) => {
          const idx = i + 1;
          return (
            <div key={idx} className="player-group">
              <input
                className="input player-input"
                id={`Player${idx}`}
                type="number"
                placeholder={`Player ${idx}`}
                value={formState.inputs[`Player${idx}`]?.value || ''}
                onChange={inputHandler}
              />
              <input
                className="input buyin-input"
                id={`BuyIn${idx}`}
                type="number"
                placeholder={`Buy-In ${idx}`}
                value={formState.buyIns[`BuyIn${idx}`]?.value || ''}
                onChange={buyinHandler}
              />
            </div>
          );
        })}

        {/* Submission button */}
        <button
          type="submit"
          className="btn-success"
          disabled={!formState.formIsValid}
        >
          Calculate Payment Statements
        </button>
      </form>
    </div>
  );
}

export default CreateGame;
