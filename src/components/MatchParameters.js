import React, { useState } from 'react';

function MatchParameters({ setMatchParams }) {
  const [overs, setOvers] = useState(8);
  const [balls, setBalls] = useState(6);
  const [allowSingles, setAllowSingles] = useState(false);
  const [sixIsOut, setSixIsOut] = useState(true);
  const [singlePlayerAllowed, setSinglePlayerAllowed] = useState(false);

  const handleOversChange = (e) => {
    setOvers(parseInt(e.target.value));
  };

  const handleBallsChange = (e) => {
    setBalls(parseInt(e.target.value));
  };

  const handleSinglesChange = () => {
    setAllowSingles(!allowSingles);
  };

  const handleSixIsOutChange = () => {
    setSixIsOut(!sixIsOut);
  };

  const handleSinglePlayerAllowedChange = () => {
    setSinglePlayerAllowed(!singlePlayerAllowed);
  };

  const handleStartMatch = () => {
    // Save settings to local storage
    localStorage.setItem('matchParams', JSON.stringify({ max_over:overs, balls_in_over:balls, single_run_allow:allowSingles,
         six_is_out:sixIsOut,single_player:singlePlayerAllowed }));
    
    // Set flag for innings 1 playing in local storage
    localStorage.setItem('innings1', 'playing');
    

    // Optionally, you may want to navigate to the next screen or component here
  };

  return (
    <div className='px-[20%] h-screen text-lg font-[500] overflow-hidden'>
      <h2 className='font-semibold text-3xl text-center my-8'>Match Settings</h2>
      <form className='bg-[#7ba3c931] px-10 mt-[20%] py-10 rounded-md w-full text-center'>
        <div className='flex gap-2  w-full '>
          <label className='w-full' htmlFor="overs">Overs </label>
          <input className=' outline-none ' min={4} max={50} type="number" id="overs" value={overs} onChange={handleOversChange} />
        </div>
        <div className='flex gap-2  w-full b'>
          <label className='w-' htmlFor="balls">Balls per Over:</label>
          <input type="number" id="balls" value={balls} onChange={handleBallsChange} className=' w-[30%] text-center bg-inherit outline-none' />
        </div>
        <div className='flex gap-2  w-full items-center'>
          <label htmlFor="singles">Allow Singles:</label>
          <input type="checkbox" id="singles" checked={allowSingles} onChange={handleSinglesChange} />
        </div>
        <div className='flex gap-2  w-full items-center'>
          <label htmlFor="sixIsOut">Six is Out:</label>
          <input type="checkbox" id="sixIsOut" checked={sixIsOut} onChange={handleSixIsOutChange} />
        </div>
        <div className='flex gap-2  w-full items-center'>
          <label htmlFor="singlePlayerAllowed">Single Player Allowed:</label>
          <input type="checkbox" id="singlePlayerAllowed" checked={singlePlayerAllowed} onChange={handleSinglePlayerAllowedChange} />
        </div>
        <button onClick={handleStartMatch} className="px-4 mx-auto w-1/2 bg-green-400 rounded-lg mt-6" type='button'>Start Match</button>
      </form>
    </div>
  );
}

export default MatchParameters;
