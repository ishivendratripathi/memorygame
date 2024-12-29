import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const Apihandling = () => {

  const [data, setData] = useState([]);
  const [counter,setcounter]=useState(0);
  const [prev,setprev]=useState("You Will Create the score BUD")

  const sufflearray = (Array) => {
    const copyshuffle=[...Array]
    for(let i=copyshuffle.length-1;i>0;i--){
      const j = Math.floor(Math.random() * (i+1));
      [copyshuffle[i],copyshuffle[j]]=[copyshuffle[j],copyshuffle[i]] 
    }
    return copyshuffle;

  }
  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon")
    .then(function (response) {
      const newshuffled=sufflearray(response.data)
      setData(newshuffled.slice(2,12))
    })
  },[])
  const handlingclick = (name) => {
    const handler=sufflearray(data)
    setData(handler)
    setcounter(counter+1)
    setprev(counter+1)
 
  }

  return (
    <>
      <div className='text-center font-extrabold text-3xl text-rose-600'>IS YOUR MEMORY GOOD?- let's find out</div>
      <div className='text-xl text-blue-600'>DON'T TAP THE SAME CARD ELSE YOU WILL LOSE</div>    
      <div>CURRENT SCORE : {counter}</div>
      <div>Best score is : {prev}</div>
      <div className='flex flex-wrap m-6 gap-6'>{data.map((a , index)=>
  <>
  <button
  key={index}
  onClick={
    ()=>handlingclick(a.name)
  }
  className="relative h-48 w-48 border-2 border-black flex flex-col items-center justify-center p-2 rounded overflow-hidden shadow-2xl group hover:text-white hover:shadow-black hover:scale-110"
>
  <span className="absolute left-0 -ml-2 h-48 w-48 origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-gray-900 transition-all duration-300 group-hover:-rotate-180"></span>
  <img
    src={a.img}
    alt=""
    className="h-24 w-24 object-contain mb-2 z-10"
  />
  <div className="text-lg font-medium z-10">{a.name}</div>
</button>

  </>)}</div>
      </>
  )
}

export default Apihandling;
