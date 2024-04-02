import React from 'react';
import MatchParameters from '../MatchParameters';
import { Button } from '@mui/material';
import Display from '../Display';
import ButtonPanel from '../ButtonPanel';

function App() {
  // Check if innings1 is playing in local storage
  const innings1Status = localStorage.getItem('innings1');

  return (
    <div className="App">
      {innings1Status === 'playing' ? (
        <div>
          <Display />
          <ButtonPanel />
        </div>
      ) : (
        <MatchParameters />
      )}
    </div>
  );
}

export default App;
