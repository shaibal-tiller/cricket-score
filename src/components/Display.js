import React, { useEffect, useState } from 'react';

const Display = () => {

  const innings = localStorage.getItem('innings1') == 'playing' ? '1st Innings' : "2nd Innings"
  const match_settings = JSON.parse(localStorage.getItem("matchParams"))
  const balls_per_over = match_settings?.balls_in_over
  const max_over = match_settings.max_over
  const max_wicket = match_settings.totalPlayer

  const commentary = localStorage.getItem('commentary')
  const [currentScore_1, setCurrentScore_1] = useState(JSON.parse(localStorage.getItem('currentScore_1')) || {});
  const [currentScore_2, setCurrentScore_2] = useState(JSON.parse(localStorage.getItem('currentScore_2')) || {});


  const updateScore = () => {
    const score1 = JSON.parse(localStorage.getItem('currentScore_1')) || {};
    setCurrentScore_1(score1);
    const score2 = JSON.parse(localStorage.getItem('currentScore_2')) || {};
    setCurrentScore_2(score2);
  };

  useEffect(() => {
    // Listen for changes in local storage and update state
    window.addEventListener('storage', updateScore);
  }, []);

  useEffect(() => {
    if ((currentScore_1?.wickets == max_wicket - 1) ||
      (currentScore_1.balls == max_over * balls_per_over)) {
      localStorage.setItem('innings2', 'playing')
      localStorage.setItem('innings1', JSON.stringify({ currentScore_1: currentScore_1, commentary: commentary }))
      localStorage.setItem('currentScore_1', JSON.stringify({ runs: 0, balls: 0, wickets: 0 }))
    }
  }, [currentScore_1])

  // useEffect(() => {
  //   if ((currentScore?.wickets == max_wicket - 1) ||
  //     (currentScore.balls == max_over * balls_per_over)) {
  //     localStorage.setItem('innings2', 'playing')
  //     localStorage.setItem('innings1', JSON.stringify({ currentScore: currentScore, commentary: commentary }))
  //     localStorage.setItem('currentScore_2', JSON.stringify({ runs: 0, balls: 0, wickets: 0 }))
  //   }
  // }, [currentScore_2])


  return (
    <div className='h-[20vh] m-4 bg-[#438486d0] rounded-lg text-white  px-2'>
      <p className='font-bold tracking-widest'> {innings}  </p>
      {innings == '1st Innings' ? <div className='flex justify-between'>

        <h2 className='text-[42px]'><span className='text-sm'>runs </span>{currentScore_1?.runs} <span className='text-sm'>for </span>{currentScore_1?.wickets}</h2>
        <h3 className='text-[42px] float-right'><span className='text-xl'>Overs: </span> {parseInt(currentScore_1?.balls / balls_per_over)}.{currentScore_1?.balls % balls_per_over}</h3>
      </div> :
        <div className='flex justify-between'>
          <h2 className='text-[42px]'><span className='text-sm'>runs </span>{currentScore_2?.runs} <span className='text-sm'>for </span>{currentScore_2?.wickets}</h2>
          <h3 className='text-[42px] float-right'><span className='text-xl'>Overs: </span> {parseInt(currentScore_2?.balls / balls_per_over)}.{currentScore_2?.balls % balls_per_over}</h3>
        </div>}
      <p></p>

    </div>
  );
}

export default Display;
