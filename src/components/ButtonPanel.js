import React, { useEffect, useState } from 'react'

const ButtonPanel = ({ setter, }) => {
    const innings = localStorage.getItem('innings1') == 'playing' ? '1st Innings' : "2nd Innings"
    const currentScore_1 = JSON.parse(localStorage.getItem('currentScore_1')) || {}
    const currentScore_2 = JSON.parse(localStorage.getItem('currentScore_2')) || {}


    const [ball, setBall] = useState(currentScore_1?.balls || 0)
    const [run, setRun] = useState(currentScore_1?.runs || 0)
    const [wicket, setWicket] = useState(currentScore_1?.wickets || 0)

    const [ball_2, setBall_2] = useState(currentScore_2?.balls || 0)
    const [run_2, setRun_2] = useState(currentScore_2?.runs || 0)
    const [wicket_2, setWicket_2] = useState(currentScore_2?.wickets || 0)

    const [progressStart, setProgressStart] = useState(0);
    const [progressInterval, setProgressInterval] = useState(null);


    useEffect(() => {
        const hudai = (innings == '1st Innings') ?
            localStorage.setItem("currentScore_1", JSON.stringify({ balls: ball, runs: run, wickets: wicket })) :
            (innings == '2nd Innings') ? localStorage.setItem("currentScore_2", JSON.stringify({ balls: ball_2, runs: run_2, wickets: wicket_2 }))
                : 0

        window.dispatchEvent(new Event('storage'))
    }, [ball, run, wicket, ball_2, run_2, wicket_2])



    const handleNewMatch = (e) => {
        const isConfirm = window.confirm("Are you Sure?\n Data will be lost")
        if (isConfirm) {
            localStorage.clear()
            setter(false)
        }
    }

    const update_ball_count = () => {
        const hudai = (innings == '1st Innings') ? setBall(ball + 1)
            : (innings == '2nd Innings') ? setBall_2(ball_2 + 1) : 0

    }
    const update_runs = (runs) => {
        const hudai = (innings == '1st Innings') ? setRun(run + runs)
            : (innings == '2nd Innings') ? setRun_2(run_2 + runs) : 0
    }
    const update_wicket = () => {
        const hudai = (innings == '1st Innings') ? setWicket(wicket + 1)
            : (innings == '2nd Innings') ? setWicket_2(wicket_2 + 1) : 0
    }

    const handleLongPressStart = (action) => {

        setProgressStart(new Date().getTime())

    };

    const handleLongPressEnd = (action) => {

        if (new Date().getTime() - progressStart>1250) {
            handleScore(action);
        }

    };

    const handleScore = (action) => {

        switch (action) {
            case 'dot':
                update_ball_count()
                break;
            case 'wicket':
                update_ball_count()
                update_wicket()
                break;
            case 'dead-ball':
                break;
            case '4':
                update_ball_count()
                update_runs(4)
                break;
            case 'wide-ball':
                update_runs(1)
                break;
            case 'no-ball':
                update_runs(1)
                break;
            case 'no-ball-4':
                update_runs(5)
                break;
            case 'no-ball-w':
                update_wicket()
                update_runs(1)
                break;
            case 'wide-ball-w':
                update_wicket()
                update_runs(1)
                break;


        }
        navigator.vibrate(200); // Vibrate after action is completed
    }
    return (
        <div className='px-4 h-full text-[2rem] text-center space-y-2 text-white '>
            <div onMouseDown={() => handleLongPressStart('wicket')}
                onTouchEnd={() => handleLongPressEnd('wicket')}
                onMouseUp={handleLongPressEnd}
                onTouchStart={handleLongPressStart} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg text-5xl font-bold bg-yellow-400'>W</div>
          
            <div onMouseUp={handleLongPressEnd}
                onTouchStart={handleLongPressStart}
                onMouseDown={() => handleLongPressStart('dead-ball')}
                onTouchEnd={() => handleLongPressEnd('dead-ball')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg bg-gray-600 '>DB</div>
            
            <div className='flex items-center w-full gap-4'>
                <div onMouseUp={handleLongPressEnd}
                    onTouchStart={handleLongPressStart}
                    onTouchEnd={() => handleLongPressEnd('wide-ball')}
                    onMouseDown={() => handleLongPressStart('wide-ball')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg bg-gray-600 w-[50%]'>Wd</div>
                <div onMouseUp={handleLongPressEnd}
                    onTouchStart={handleLongPressStart}
                    onTouchEnd={() => handleLongPressEnd('wide-ball-w')}
                    onMouseDown={() => handleLongPressStart('wide-ball-w')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg bg-gray-600 w-[50%]'>Wd + W</div>
            </div>
            <div className='  flex justify-between gap-3 items-center '>
                <div className=' flex items-center  w-[75%]  gap-2'>
                    <div onMouseUp={handleLongPressEnd}
                        onTouchStart={handleLongPressStart}
                        onTouchEnd={() => handleLongPressEnd('no-ball')}
                        onMouseDown={() => handleLongPressStart('no-ball')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg bg-yellow-200 py-6 w-[20%]' >
                        NB
                    </div>
                    <div onMouseUp={handleLongPressEnd}
                        onTouchStart={handleLongPressStart}
                        onTouchEnd={() => handleLongPressEnd('no-ball-4')}
                        onMouseDown={() => handleLongPressStart('no-ball-4')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg bg-orange-400 py-6 w-[40%]'>
                        NB+4
                    </div>
                    <div onMouseUp={handleLongPressEnd}
                        onTouchStart={handleLongPressStart}
                        onTouchEnd={() => handleLongPressEnd('no-ball-w')}
                        onMouseDown={() => handleLongPressStart('no-ball-w')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg bg-orange-400 py-6 w-[40%]'>
                        NB+W
                    </div>
                </div>
                <div onMouseUp={handleLongPressEnd}
                    onTouchStart={handleLongPressStart}
                    onTouchEnd={() => handleLongPressEnd('4')}
                    onMouseDown={() => handleLongPressStart('4')}
                    className='active:border-black  border-2 border-transparent  rounded-lg active:scale-95 shadow-lg w-[25%] bg-orange-400 text-center
                 text-5xl font-bold py-6 '>4</div>
            </div>
            <div onMouseUp={handleLongPressEnd}
                onTouchStart={handleLongPressStart}
                onTouchEnd={() => handleLongPressEnd('dot')}
                onMouseDown={() => handleLongPressStart('dot')} className='active:border-black border-2 border-transparent select-none rounded-lg active:scale-95 shadow-lg w-full px-4 bg-orange-300 min-h-8 mt-auto py-4 font-bold text-5xl'>Dot</div>
            <div onClick={handleNewMatch} className='rounded-lg active:scale-95 shadow-lg mx-auto w-[80%] px-4 bg-orange-800 min-h-8 py-2 !mt-10  font-bold text-3xl'>RESET</div>
        </div>
    )
}

export default ButtonPanel