import React from 'react';

const BetOptions = ({ betAmount, setBetAmount, activePaylines, setActivePaylines }) => {

    return(
        <div className="">
            
            <div className='max-w-sm mx-auto'>
                <label className='block mb-1 text-sm font-medium text-gray-900'>Paylines: </label>
                <select
                    value={activePaylines}
                    onChange={(e) => setActivePaylines(Number(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    {[...Array(25).keys()].map((payline) => (
                    <option key={payline + 1} value={payline + 1}>
                        {payline + 1}
                    </option>
                    ))}
                </select>
            </div>
        </div>
    )

};

export default BetOptions;
