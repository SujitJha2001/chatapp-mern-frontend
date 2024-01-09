import SocketIO from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import SendLogo from "../../images/send.png"
import Message from '../Message/Message.js'
import ReactScrollToBottom from 'react-scroll-to-bottom';
import CloseIcon from '../../images/closeIcon.png'
// import { user } from "../Join/Join"
import { useLocation,useNavigate } from 'react-router-dom';
let socket;
const ENDPOINT = "http://localhost:4000"


const Chat = () => {
    const location = useLocation()
    const user = location.state?.name;
    const navigate = useNavigate();
    if(!user)
    {
        navigate("/");
    }
    const [id, setid] = useState("")
    const [messages, setMessages] = useState([])
    const send = () => {
        let message = document.getElementById("chatInput").value;
        if (message && message.length) {
            socket.emit("message", { message, id });
            document.getElementById("chatInput").value = "";
        }
    }
    console.log(messages)
    useEffect(() => {
        fetch("http://localhost:4000/").then((res)=>console.log(res.text())).catch((err)=>console.log(err))
        // socket = SocketIO(ENDPOINT, { transports: ["websocket"] });
        socket = SocketIO(ENDPOINT);

        socket.on('connect', () => {
            // alert("Connected")
            setid(socket.id)
        })
        socket.emit('joined', { user })
        socket.on("welcome", (data) => {
            console.log(data)
            setMessages([...messages, data])
        })
        socket.on("userJoined", (data) => {
            console.log(data)
            setMessages([...messages, data])
        })
        socket.on("leave", (data) => {
            setMessages([...messages, data])
        })
        return () => {
            // socket.emit("disconnect");
            socket.off();
        }
    }, [])
    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessages([...messages, data])
        })
        return () => {
            socket.off()
        }
    }, [messages])

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>Communicate</h2>
                    <a href='/'><img src={CloseIcon} alt='Close' /></a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {
                        messages.map((item, index) => {
                            return <Message key={index} user={(item.id === id ? '' : item.user)} message={item.message} classs={(item.id === id ? 'righr' : 'left')} />
                        })
                    }
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input onKeyPress={(event) => event.key === "Enter" ? send() : null} type='text' id='chatInput' />
                    <button className='sendBtn' onClick={send}><img src={SendLogo} alt='Send' /></button>
                </div>
            </div>
        </div>
    )
}

export default Chat