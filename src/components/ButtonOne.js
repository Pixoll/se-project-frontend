import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../styles/ButtonOne.css"

export function ButtonOne({ text, to }) {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(to); // Navega a la ruta especificada
    };
  
    return (
      <button className="ButtonOne" onClick={handleClick}>
        <span className="text-button">{text}</span>
      </button>
    );
}   