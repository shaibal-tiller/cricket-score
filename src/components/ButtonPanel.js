import React from 'react'

const ButtonPanel = () => {
    return (
        <div className='px-2 h-full text-[2rem] text-center space-y-2 text-white'>
            <div className=' active:scale-95 shadow-lg text-5xl font-bold bg-yellow-400'>W</div>
            <div className=' active:scale-95 shadow-lg bg-gray-600 '>DB</div>
            <div className=' active:scale-95 shadow-lg bg-gray-600 '>Wd</div>
            <div className='  flex justify-between gap-4 '>
                <div className='   w-full space-y-2'>
                    <div className=' active:scale-95 shadow-lg bg-yellow-200'>
                        NB
                    </div>
                    <div className=' active:scale-95 shadow-lg bg-orange-400'>
                        NB+4
                    </div>
                </div>
                <div className=' active:scale-95 shadow-lg w-full bg-orange-400 text-center text-5xl font-bold py-6'>4
                </div>
            </div>
            <div className=' active:scale-95 shadow-lg w-full px-4 bg-orange-300 min-h-8 mt-auto py-4 font-bold text-5xl'>Dot</div>
        </div>
    )
}

export default ButtonPanel