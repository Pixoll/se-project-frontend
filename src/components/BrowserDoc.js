import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BrowserDoc.css"
export function ButtonBrowser({text, to}){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(to);
    }
    return(
        <button type="submit" className="ButtonBrowser" onClick={handleClick}>
            <span className="text-ButtonBrowser"> {text} </span>
        </button>
    );
}
export function BrowserDoc(){
    const [specialist, setSpecialist] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return(
        <div className="ContainerBrower">
            <h3 className="title">BUSCA TU ESPECIALISTA</h3>
            <form className="FormBrowser">
                <input type="specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} placeholder="Especialidad" required/>
                <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del especilista" required/>
                <ButtonBrowser text={"BUSCAR"} to={"algo"}/>
            </form>

        </div>
    );
}
