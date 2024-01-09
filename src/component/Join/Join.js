import React, { useState } from 'react'
import "./Join.css"
import logo from "../../images/chatcoin-chat-logo.png";
import { Link, useNavigate } from "react-router-dom";
// let user;
// const sendUser = () => {
//   user = document.querySelector("#joinInput").value;
//   document.querySelector("#joinInput").value = ""
// }
const Join = () => {
  const navigate = useNavigate()
  const [name, setname] = useState("")
  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt="logo" />
        <h1>Communicate</h1>
        <input type='text' onChange={(e) => { setname(e.target.value) }} placeholder='Enter your Name' id='joinInput' value={name} />
        {/* <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat"> */}
        <button onClick={() => {
          if (name && name.length) {
            navigate("/chat", {
              state: { name: name }
            })
          }
        }} className='joinbtn'>Login In</button>
        {/* </Link> */}
      </div>
    </div >
  )
}

export default Join
// export { user }