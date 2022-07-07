import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Login(props){

    const [username, setUsername] = useState("guest" + getRandomInt(1000));
    const [nameColor, setNameColor] = useState("#" + getRandomColor());
    const navigate = useNavigate();

    function getRandomColor(){
        return Math.floor(Math.random()*16777215).toString(16);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function handleUsernameChange(e){
        setUsername(e.target.value);
    }

    function handleColorChange(e){
        console.log(e);
        setNameColor(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.setUser(username);
        props.setColor(nameColor);
        if(username){
            navigate('/chat');
        }
    }


    return(
        <div id="login">
            <p>Chose your name and your color</p>
            <form className="login-form">
                <input className="name-input" type="text" value={username} onChange={handleUsernameChange}/>
                <input className="color-input" type="color" value={nameColor} onChange={handleColorChange}/>
                <button className="submit" type="submit" onClick={handleSubmit}>Join the room</button>
            </form>
        </div>
    )
}