import React, { useRef, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { TbFlag3Filled } from "react-icons/tb";

const StopWatch = () => {

  const [time, setTime] = useState(0)
  const [isRunning, setIsRumming] = useState(false)
  const [stopWatch, setStopWatch] = useState([])

  const formateTime = (time) =>{
    const hours = `0${Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`.slice(-2)
    const minutes = `0${Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2)
    const seconds = `0${Math.floor((time % (1000 * 60)) / 1000)}`.slice(-2)
    const milliSec = `0${Math.floor((time % 1000) / 10)}`.slice(-2)

      return  (
      <div className='text-center sm:text-3xl md:text-5xl font-bold'> {
        `${hours}:${minutes}:${seconds}`}<span className='text-red-500'>.</span>
          <span className='text-center font-bold text-sm sm:text-2xl md:text-4xl text-red-500'>
              {`${milliSec}`}
          </span> 
      </div>) 
  }
  
  const handleTimeLaps = () =>{
    let  timer  = formateTime(time).props.children[1] + ":" + formateTime(time).props.children[3].props.children
    setStopWatch((prevSec)=> ([timer,  ...prevSec])) 
  }
    
  const timeRef = useRef(null)
  
  const handleStart = () =>{
      if(isRunning){
        clearInterval(timeRef.current)
        setIsRumming(false)
      }else{
        setIsRumming(true) 
        timeRef.current = setInterval(() => {
          setTime((prevTime) => prevTime + 4)
        }, 1);
      }
    }
    
    const handleReset = () =>{
      clearInterval(timeRef.current)
      setIsRumming(false)
      setTime(0)
      setStopWatch([])
    }

  return (
    <div className='h-screen bg-black'>
        <div className='h-full w-[50%] mx-auto text-white bg-white/10 pt-5'>
          <div className='border-2 h-[150px] w-[150px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] mx-auto rounded-full flex flex-col justify-center items-center md:space-y-2'> 
            <h1>{formateTime(time)}</h1>
            <div className='flex space-x-1 sm:space-x-4 md:space-x-11 font-semibold sm:text-sm text-[10px] sm:text-md pr-5 sm:pr-10 md:pr-16'>
              <p> hr </p>
              <p> min </p>
              <p> sec </p>
             </div>  
           </div>
        <div className='w-[50%] mx-auto flex justify-between my-4'>
            <button onClick={handleStart} className=' sm:p-2 md:p-4 text-xs md:text-lg  text-white hover:bg-blue-600 bg-blue-700 rounded-full font-semibold border-black/50 active:scale-95 transition-all duration-200 ease-out'>{isRunning?<FaPause />:<FaPlay />}</button>
            <button onClick={handleTimeLaps} className=' sm:p-2 md:p-4 text-xm md:text-xl text-white hover:bg-green-400 bg-green-500 rounded-full font-semibold border-black/50 active:scale-95 transition-all duration-200 ease-out'><TbFlag3Filled /></button>
            <button onClick={handleReset} className='sm:p-2 md:p-4 text-xs md:text-lg text-white hover:bg-red-400 bg-red-500 rounded-full font-semibold border-black/50 active:scale-95 transition-all duration-200 ease-out'><GrPowerReset /></button>
        </div>

        <div className=''> 
          <div className='flex text-[4px] sm:text-[12px] md:text-base w-[50%] mx-auto justify-between border-b-2 border-white/50 text-white'>
            <p className='p-2'>Laps</p>
            <p className='p-2'>lap time</p>
            <p className='p-2'>total</p>
          </div>
          <div className='flex flex-col w-[50%] mx-auto overflow-auto h-44 scrollbar-thin'>
          {
                stopWatch.map((curValue, index)=>{
                  return <div key={index} className='flex text-[4px] sm:text-[8px] md:text-xs lg:text-sm xl:text-base justify-between border-b-2 border-white/50 p-1 text-white bg-white/10 xl:m-2 m-1.5'> 
                    <p className='xl:p-2 lg:p-1.5'> Lap: {index + 1} </p>
                    <p className='xl:p-2 lg:p-1.5'> +{curValue} </p>
                    <p className='xl:p-2 lg:p-1.5'> {curValue} </p>
                    </div>
                })
              }
          </div>
        </div>
        
        </div>        
    </div>
  )
}

export default StopWatch
