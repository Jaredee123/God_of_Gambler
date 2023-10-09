import React, { useState } from 'react';

function App() {
  const [player_count, setplayer_count] = useState('');

  return (
    <>
      <Header />
      <main>
        <Inputs player_count={player_count} setplayer_count={setplayer_count} />
        <Players player_count={player_count} />
      </main>
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

function Inputs({ player_count, setplayer_count }) {
  return (
    <form>
      <input
        type="number"
        placeholder="Number of Players"
        value={player_count}
        onChange={(e) => setplayer_count(e.target.value)}
      />
    </form>
  );
}

function Players({ player_count }) {
  function generate_player_inputs() {
    const player_inputs = [];
    for (let i = 1; i <= player_count; i++) {
      player_inputs.push(
        <input key={i} type="number" placeholder={`Player ${i}`} />,
      );
    }
    return player_inputs;
  }
  return (
    <form>
      <input type="number" placeholder="Buy In Amount" />
      {generate_player_inputs()}
    </form>
  );
}

export default App;
