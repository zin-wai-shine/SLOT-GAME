import React from 'react'
import SlotMachine from './components/SlotMachine.jsx'
import PaylineTest from './components/PaylineTest.jsx'

export default function App() {
  return (
    <>
      <div className='bg-black w-full h-full'>
          <SlotMachine />

          {/* Payline Test : you can test symbol of payline format close SlotMachine and open PaylineTest */}
          {/* <PaylineTest/> */}
      </div>
    </>
  )
}
