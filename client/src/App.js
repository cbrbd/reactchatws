import './App.css';
import { Chat } from './Chat';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Login } from './Login';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState("");
  const [color, setColor] = useState("");
  const [ip, setIp] = useState(null);

  function handleUsername(u){
    setUser(u);
  }

  function handleColor(c){
    setColor(c);
  }

  //another way to get the ip
  // useEffect(function(){
  //   fetch('/ip')
  //       .then(function(result){
  //           return result.json();
  //       })
  //       .then(
  //         (result) => {
  //           setIp(result)
  //         },
  //         (error) => {
  //           console.log("error");
  //         }
  //       )
  // }, [])

  useEffect(function(){
    setIp(window.location.hostname);
  },[])
  


  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={handleUsername} setColor={handleColor}/>}/>
        <Route path="/chat" element={ip && <Chat user={user} color={color} ip={ip}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
