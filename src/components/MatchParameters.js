import React, { useState } from 'react';


const MINUS = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
const PLUS = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>



export const InputPanel = ({ label, type = 'number', input_id, min, max, setter, inc_icon = PLUS, dec_icon = MINUS, value, disabled = true }) => {


  return (<div className='flex gap-2  w-full '>
    <label className='w-full my-auto' htmlFor={input_id}>{label}</label>
    <div className=' border-slate-500 border-[1px]  rounded-md text-center grid grid-cols-6 place-items-center'>
      <button onClick={(e) => setter(e, 'dec')} className=' col-span-2 border-r-2 border-black h-full pr-1 '>{dec_icon}</button>
      <input className='basis-2 outline-none text-center col-span-2 ' min={min} max={max} type="number" disabled={disabled}
        id={input_id} value={value} />
      <button onClick={(e) => setter(e, 'inc')} className='col-span-2 border-l-2 border-black h-full pl-1 '>{inc_icon}</button>
    </div>

  </div>)
}

const MatchParameters = ({ setter }) => {
  const [overs, setOvers] = useState(8);
  const [balls, setBalls] = useState(6);
  const [allowSingles, setAllowSingles] = useState(false);
  const [sixIsOut, setSixIsOut] = useState(true);
  const [singlePlayerAllowed, setSinglePlayerAllowed] = useState(false);
  const [totalPlayers, setTotalPlayers] = useState(10)

  const handleOversChange = (e, action) => {
    e.preventDefault()
    e.stopPropagation()
    const currentOver = document.getElementById('overs')
    // currentOver.value = (action == 'inc') ? parseInt(currentOver.value) + 1 :
    //   (action == 'dec') ? parseInt(currentOver.value) - 1 : currentOver.value
    setOvers((action == 'inc') ? parseInt(currentOver.value) + 1 :
      (action == 'dec') ? parseInt(currentOver.value) - 1 : currentOver.value);
  };

  const handleBallsChange = (e, action) => {
    e.preventDefault()
    e.stopPropagation()
    const currentBallsperOver = document.getElementById('balls')
    setBalls((action == 'inc') ? parseInt(currentBallsperOver.value) + 1 :
      (action == 'dec') ? parseInt(currentBallsperOver.value) - 1 : currentBallsperOver.value);
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

  const handleTotalPlayers = (e, action) => {
    e.preventDefault()
    e.stopPropagation()
    const currentPlayers = document.getElementById('players')
    setTotalPlayers((action == 'inc') ? parseInt(currentPlayers.value) + 1 :
      (action == 'dec') ? parseInt(currentPlayers.value) - 1 : currentPlayers.value);

  }

  const handleStartMatch = () => {
    // Save settings to local storage
    localStorage.setItem('matchParams', JSON.stringify({
      max_over: overs, balls_in_over: balls, single_run_allow: allowSingles,
      six_is_out: sixIsOut, single_player: singlePlayerAllowed, totalPlayer: totalPlayers
    }));

    // Set flag for innings 1 playing in local storage
    localStorage.setItem('innings1', 'playing');

    localStorage.setItem('commentry',[])
    localStorage.setItem('currentScore_1', JSON.stringify({ balls: 0, runs: 0, wickets: 0 }))
    localStorage.setItem('currentScore_2', JSON.stringify({ balls: 0, runs: 0, wickets: 0 }))
    setter(true)
    // Optionally, you may want to navigate to the next screen or component here
  };

  return (
    <div className='px-4 lg:px-[20%] h-screen text-lg font-[500] overflow-hidden'>
      <h2 className='font-semibold text-3xl text-center my-8'>Match Settings</h2>
      <form className='bg-[#7ba3c931] px-10 mt-[20%] py-10 rounded-md w-full text-center'>
        <div className=' mb-4 border-2 border-black p-2 rounded-lg space-y-4'>
          <InputPanel label={'Total Overs'} input_id={'overs'} min={3} max={50} default={8} value={overs} setter={handleOversChange} />
          <InputPanel label={'Balls/Over'} input_id={'balls'} min={3} max={10} default={6} value={balls} setter={handleBallsChange} />

          <InputPanel label={'Players'} input_id={'players'} min={3} max={20} default={10} value={totalPlayers} setter={handleTotalPlayers} />
        </div>




        <div className='flex gap-2  w-full items-center'>

          <input type="checkbox" id="singles" checked={allowSingles} onChange={handleSinglesChange} />
          <label htmlFor="singles">Single Run {allowSingles ? 'Allowed' : 'Not allowed'}</label>
        </div>
        <div className='flex gap-2  w-full items-center'>

          <input type="checkbox" id="sixIsOut" checked={sixIsOut} onChange={handleSixIsOutChange} />
          <label htmlFor="sixIsOut">Six is {sixIsOut ? "" : "Not "}Out</label>
        </div>
        <div className='flex gap-2  w-full items-center'>
          <input type="checkbox" id="singlePlayerAllowed" checked={singlePlayerAllowed} onChange={handleSinglePlayerAllowedChange} />
          <label htmlFor="singlePlayerAllowed">Single Player {singlePlayerAllowed ? 'Allowed' : 'Not allowed'}</label>

        </div>
        <button onClick={handleStartMatch} className="px-4 mx-auto w-1/2 bg-green-400 rounded-lg mt-6" type='button'>Start Match</button>
      </form>
    </div>
  );
}

export default MatchParameters;
