import React, { useEffect, useState } from 'react';
import MatchParameters from '../MatchParameters';
import { Button } from '@mui/material';
import Display from '../Display';
import ButtonPanel from '../ButtonPanel';

const App = () => {
  // Check if innings1 is playing in local storage
  const innings1Status = localStorage.getItem('innings1');
  const innings2Status = localStorage.getItem('innings2');
  const [matchOn, setMatchOn] = useState((innings1Status && innings1Status == 'playing') || (innings2Status && innings2Status == 'playing'))
  const [runs, setRuns] = useState(0)
  const [balls, setBalls] = useState(0)
  const [wickets, setWickets] = useState(0)

  // const getScore = () => {

  //   const score = localStorage.getItem('currentScore')
    
  // }

  // useEffect(() => {
  //   localStorage.setItem('currentScore', JSON.stringify({ balls: totalBall, runs: totalRun, wickets: totalWickets }))
  // }, [totalRun, totalBall, totalWickets])


  return (
    <div className="App">
      {matchOn ? (
        <div>
          <Display  />
          <ButtonPanel setter={setMatchOn}  />
        </div>
      ) : (
        <MatchParameters setter={setMatchOn} />
      )}
    </div>
  );
}

export default App;
