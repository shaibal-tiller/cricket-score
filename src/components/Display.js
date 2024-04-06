import React, { useEffect, useState } from 'react';

const Display = () => {

  const innings = localStorage.getItem('innings1') == 'playing' ? '1st Innings' : "2nd Innings"
  const match_settings = JSON.parse(localStorage.getItem("matchParams"))
  const balls_per_over = match_settings?.balls_in_over
  const max_over = match_settings.max_over
  const max_wicket = match_settings.totalPlayer


 

  const [currentScore_1, setCurrentScore_1] = useState(JSON.parse(localStorage.getItem('currentScore_1')) || {});
  const [currentScore_2, setCurrentScore_2] = useState(JSON.parse(localStorage.getItem('currentScore_2')) || {});
  const [is_match_over, set_is_match_over] = useState(false)

  const showResult = (e) => {
    set_is_match_over(true)

  }
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

    if (innings == '1st Innings') {
      if (currentScore_1?.wickets == max_wicket - 1) {
        localStorage.setItem('innings2', 'playing')
        localStorage.setItem('innings1', "all-out")
      }
      else if ((currentScore_1.balls == (max_over * balls_per_over))) {
        console.log(currentScore_1.balls);
        localStorage.setItem('innings2', 'playing')
        localStorage.setItem('innings1', "over")
      }
    }
  }, [currentScore_1])



  useEffect(() => {
    if (innings == '2nd Innings') {
      const target = JSON.parse(localStorage.getItem('currentScore_1')).runs

      if (target <= currentScore_2.runs) {
        localStorage.setItem('innings2', 'won')
        localStorage.setItem('innings1', 'lost')
        showResult()
      }
      else if (currentScore_2?.wickets == max_wicket - 1) {

        localStorage.setItem('innings2', 'lost')
        localStorage.setItem('innings1', 'won')
        showResult()
      }
      else if ((currentScore_2.balls == (max_over * balls_per_over))) {

        localStorage.setItem('innings2', 'lost')
        localStorage.setItem('innings1', 'won')
        showResult()
      }
    }
  }, [currentScore_2])

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
      {!is_match_over ?
        (<div>
          <p className='font-bold tracking-widest'> {innings}  </p>
          {innings == '1st Innings' ? <div className='flex justify-between'>

            <h2 className='text-[42px]'><span className='text-sm'>runs </span>{currentScore_1?.runs} <span className='text-sm'>for </span>{currentScore_1?.wickets}</h2>
            <h3 className='text-[42px] float-right'><span className='text-xl'>Overs: </span> {parseInt(currentScore_1?.balls / balls_per_over)}.{currentScore_1?.balls % balls_per_over}</h3>
          </div> :
            <div className='flex justify-between'>
              <h2 className='text-[42px]'><span className='text-sm'>runs </span>{currentScore_2?.runs} <span className='text-sm'>for </span>{currentScore_2?.wickets}</h2>
              <h3 className='text-[42px] float-right'><span className='text-xl'>Overs: </span> {parseInt(currentScore_2?.balls / balls_per_over)}.{currentScore_2?.balls % balls_per_over}</h3>
            </div>}
        </div>)
        :
        <div className='text-center py-4 text-3xl'>
          <p>Match Ended</p>
          <p>Team 2 <span className='font-semibold capitalize'>{localStorage.getItem('innings2')}</span></p>
        </div>}

    </div>
  );
}

export default Display;
