import React, { useEffect, useState,useRef } from "react";
import logo from "./logo.svg";
import "./App.css";


function App() {

  const [lengthP,setLengthP] = useState(8)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const [copyText,setCopyText] = useState('Copy')
  const [copyColor,setCopyColor] = useState('#1a49d8')

const inputRef = useRef(null)  // default value null
// useRef hook(refernec hook) is used to take reference of any (gernlaly html /element)
// useRef hook use krney ke liye ek variable bnanana pdta hai

  function generatePassword (numAllowed,charAllowed,lengthP){
    let password =''
    let string ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numAllowed) string+='0123456789'
    if(charAllowed) string+='!@#$%^&*'

    for (let i = 0; i < lengthP; i++) {
       password += string[Math.floor(Math.random()*string.length)];
      
    }
    return password

  }

  const handleAllowNumChange =()=>{
    setNumAllowed((prev)=>!prev)
  } 

  useEffect(()=>{
    const passwordG = generatePassword(numAllowed,charAllowed,lengthP)

    setPassword(passwordG)

  },[numAllowed,charAllowed,lengthP])  // whenever these states changes useeffect ke ander saala masala yani function chlengenegy , use effect hooks means component  + complete DOM render honey ke baad by default run krta hai, ye dependency array kind of watch rhegfa in states jaise hi change run useEffect again

  function handleCopy (){
    window.navigator.clipboard.writeText(password)
    setCopyText('Copied!')
    setCopyColor('green')
    inputRef.current?.select()  // optionally select coz maybe curent value undefined ya 0 ho
    // inputRef.current?.setSelectionRange(0,4) // to select range wise

    setTimeout(()=>{
      setCopyText('Copy')
      setCopyColor('#1a49d8')

    },2000)
  }


  return (
    <>
      <div className="vh-100 vw-100 bg-black d-flex justify-content-center align-items-center text-light">
        <div
          className="d-flex flex-column bg-gradient align-items-center responsive-container"
        >
          <div className="heading">Password Generator</div>
          <div className="input-container">
            <input
              type="text"
              className="input-text"
              placeholder="password"
              value={password}
              readOnly
              ref={inputRef}
            />
            <button id="copy" className="btn-copy" onClick={handleCopy} style={{backgroundColor:copyColor}} >{copyText}</button>
          </div>
          <div className="d-flex options-container text-warning">
            <input type="range" className="input-range" min="8" max="50" onChange={(e)=>setLengthP(e.target.value)} value={lengthP} />
            <span>Length : {lengthP}</span>
            <label>
              <input type="checkbox" onChange={handleAllowNumChange} />
              Numbers
            </label>
            <label>
              <input type="checkbox" onChange={()=>setCharAllowed((prev)=>!prev)} />
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
