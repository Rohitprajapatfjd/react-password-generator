import React from 'react'
import { useRef, useEffect, useCallback, useState } from 'react';

export default function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(6);
  const [allowNumber, setallowNum] = useState(false);
  const [allowCharacter, setallowChar] = useState(false)
  const passgenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQUVRSTWXYZabcdefghijklmnopquvrstwxyz";
    if (allowNumber) str += "0123456789";
    if (allowCharacter) str += "!@#$%^&*(){};:?/"
    for (let index = 1; index <= length; index++) {
      pass += str[Math.floor(Math.random() * str.length + 1)]
    }
    setpassword(pass)
  }, [length, allowCharacter, allowNumber]);

  let refFunction = useRef()
  
  // copy function 

  const btnclick = useCallback(()=>{
    refFunction.current.select()
    refFunction.current.setSelectionRange(0,100);
    navigator.clipboard.writeText(refFunction.current.value)

  },[])


  // useEffect run when every state is change
  useEffect(() => {
    passgenerator()
  }, [length, allowCharacter, allowNumber, passgenerator])

  return (
    <div>
      <div className='bg-zinc-800 w-full h-screen flex justify-center'>
        <div className='bg-zinc-600 w-3/5 max-h-48 mt-20 rounded-lg text-white flex flex-col items-center'>
          <h2 className='text-3xl text-center my-4'>Password Generator</h2>
          <div className='flex items-center overflow-hidden'>
            <input ref={refFunction} className='w-[380px] px-5 font-medium text-2xl py-1 outline-none text-black rounded-s-xl' value={password} type='text' placeholder='' readOnly />
            <button onClick={btnclick}  className='bg-blue-600 py-[6.6px] font-medium text-xl px-3 rounded-e-xl hover:bg-blue-500'>copy</button>
          </div>
          <div className='mt-5 flex items-center'>
            <input type="range" name="" id="" value={length} onChange={(e) => setlength(e.target.value)} min={6} max={30} />
            <label className='mx-2 font-medium'>Length: {length}</label>
            <input type="checkbox" name="" id="" defaultChecked={allowNumber} onChange={() => { setallowNum((prev) => !prev) }} />
            <label className='mx-2 font-medium'>Numbers</label>
            <input type="checkbox" name="" id="" defaultChecked={allowCharacter} onChange={() => setallowChar((prev) => !prev)} />
            <label className='mx-2 font-medium'>Characters</label>
          </div>

        </div>
      </div>
    </div>
  )
}
