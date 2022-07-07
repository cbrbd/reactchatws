import { w3cwebsocket as W3CWebSocket } from "websocket";
import {useEffect, useState, useRef} from "react"
import { useNavigate } from "react-router-dom";


export function Chat(props){
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  
  const client = new W3CWebSocket(`ws://${props.ip}:8000`);


  useEffect(function(){
    client.onopen = ()=>{
      console.log("Websocket client connected")
    };
    client.onmessage = (message)=>{
      setMessages(messages => [...messages, JSON.parse(message.data)])
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(function(){
    if(!props.user){
      navigate('/');
    }
  })

  function handleTextAreaChange(e){
    setMessage(e.target.value)
  }

  function sendMessage(e){
    e.preventDefault();
    if(message === ""){
      return
    }
    const dataToSend = {
      user: props.user,
      color: props.color,
      message: message
    }
    client.send(JSON.stringify({dataToSend, type: "userevent"}))
    setMessage("")
  }

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chatting">
      <div className="msg-history">
        <span>Joined chatroom as {props.user} </span>
        {messages.map(function(msg, index){
          return (
          <div className="msg" key={index}>
            <div className="usr" style={{color: msg.color}}>{msg.user}</div>
            <div className='text'>{msg.message}</div>
          </div> 
        )
        
        })}
        <div ref={messagesEndRef}/>
      </div>
      <div className="text-box">
        <form>
        <input
          type="text"
          value={message}
          onChange={handleTextAreaChange}
          placeholder="type your message here..."
          />
        <button onClick={sendMessage}>
          Send
        </button>
        </form>
        
      </div>
    </div>
    );
}