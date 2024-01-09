import React from 'react'
import "./Message.css";
const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className='messageBox left'>
                {`${user}: ${message}`}
            </div>
        )
    }
    else {
        return(
            <div className='messageBox right'>
                {`You: ${message}`}
            </div>
        )
    }

}

export default Message