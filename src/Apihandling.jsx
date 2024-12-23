import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const Apihandling = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://digimon-api.vercel.app/api/digimon")
    .then(function (response) {
      setData(response.data)
    })
  },[])

  return (
    <>
      <div className='text-center font-extrabold text-3xl text-rose-600'>IS YOUR MEMORY GOOD?</div>
      <div className='text-xl text-blue-600'>DON'T TAP THE SAME CARD ELSE YOU WILL LOSE</div>    
  <div className='flex flex-wrap m-6 gap-6'>{data.map((a)=>
  <>
  <div className='h-48 w-48 border-2 border-black flex flex-col items-center justify-center p-2 rounded'>
<img src={a.img} alt="" className='h-24 w-24 object-contain mb-2'/>
  <div className='text-lg font-medium'>{a.name}</div>
  </div>

  </>)}</div>
      </>
  )
}

export default Apihandling;
