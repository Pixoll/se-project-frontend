import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./styles/ButtonOne.css";
import Container1 from "./pages/container1"; // Componente principal
import Funcionario from "./pages/funcionario"; // Página para funcionarios
import Especialistas from "./pages/especialista"; // Página para especialistas

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Container1 />} />
      <Route path="/funcionario" element={<Funcionario />} />
      <Route path="/especialistas" element={<Especialistas />} />
    </Routes>
  );
}


export default App;

