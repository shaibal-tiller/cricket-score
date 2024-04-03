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

    useEffect(() => {
        innings == '1st Innings' ? localStorage.setItem("currentScore_1", JSON.stringify({ balls: ball, runs: run, wickets: wicket }))
            : localStorage.setItem("currentScore_2", JSON.stringify({ balls: ball_2, runs: run_2, wickets: wicket_2 }))

        window.dispatchEvent(new Event('storage'))
    }, [ball, run, wicket])

    const handleNewMatch = (e) => {
        const isConfirm = window.confirm("Are you Sure?\n Data will be lost")
        if (isConfirm) {
            localStorage.clear()
            setter(false)
        }
    }

    const update_ball_count = () => {
        innings == '1st Innings' ? setBall(ball + 1)
            : setBall_2(ball + 1)

    }
    const update_runs = (runs) => {
        innings == '1st Innings' ? setRun(run + runs)
            : setRun_2(run + runs)
    }
    const update_wicket = () => {
        innings == '1st Innings' ? setWicket(wicket + 1)
            : setWicket_2(wicket + 1)
    }

    const handleScore = (e, action) => {
        e.preventDefault()
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
    }
    return (
        <div className='px-2 h-full text-[2rem] text-center space-y-2 text-white'>
            <div onClick={(e) => handleScore(e, 'wicket')} className=' active:scale-95 shadow-lg text-5xl font-bold bg-yellow-400'>W</div>
            <div onClick={(e) => handleScore(e, 'dead-ball')} className=' active:scale-95 shadow-lg bg-gray-600 '>DB</div>
            <div onClick={(e) => handleScore(e, 'wide-ball')} className=' active:scale-95 shadow-lg bg-gray-600 '>Wd</div>
            <div className='  flex justify-between gap-4 '>
                <div className='   w-full space-y-2'>
                    <div onClick={(e) => handleScore(e, 'no-ball')} className='active:scale-95 shadow-lg bg-yellow-200'>
                        NB
                    </div>
                    <div onClick={(e) => handleScore(e, 'no-ball-4')} className=' active:scale-95 shadow-lg bg-orange-400'>
                        NB+4
                    </div>
                    <div onClick={(e) => handleScore(e, 'no-ball-w')} className=' active:scale-95 shadow-lg bg-orange-400'>
                        NB+W
                    </div>
                </div>
                <div onClick={(e) => handleScore(e, '4')} className=' active:scale-95 shadow-lg w-full bg-orange-400 text-center text-5xl font-bold py-6'>4</div>
            </div>
            <div onClick={(e) => handleScore(e, 'dot')} className=' active:scale-95 shadow-lg w-full px-4 bg-orange-300 min-h-8 mt-auto py-4 font-bold text-5xl'>Dot</div>
            <div onClick={handleNewMatch} className=' active:scale-95 shadow-lg mx-auto w-[80%] px-4 bg-orange-800 min-h-8 py-2 !mt-10  font-bold text-3xl'>RESET</div>
        </div>
    )
}

export default ButtonPanel